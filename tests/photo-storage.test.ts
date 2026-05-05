import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { createLocalWarrantyPhotoStorage } from '@/lib/photo-storage';

async function createJpegBuffer(width = 2400, height = 1600): Promise<Buffer> {
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 12, g: 12, b: 12 },
    },
  })
    .jpeg({ quality: 95 })
    .toBuffer();
}

describe('POC-008 local warranty photo storage', () => {
  it('validates and stores compressed webp under warranty_id path with metadata only', async () => {
    const root = await mkdtemp(join(tmpdir(), 'nexppf-photo-storage-'));
    try {
      const storage = createLocalWarrantyPhotoStorage({ rootDir: root, maxBytes: 5_000_000, maxDimension: 1600 });
      const input = await createJpegBuffer();

      const result = await storage.saveWarrantyPhoto({
        warrantyId: 'warranty-123',
        photoType: 'car_front',
        originalName: 'front.jpg',
        mimeType: 'image/jpeg',
        bytes: input,
        uploadedBy: 'dealer-user-1',
      });

      expect(result).toMatchObject({
        warrantyId: 'warranty-123',
        photoType: 'car_front',
        filePath: 'warranties/warranty-123/car_front.webp',
        mimeType: 'image/webp',
        uploadedBy: 'dealer-user-1',
      });
      expect(result.fileSize).toBeGreaterThan(0);
      expect(result.fileSize).toBeLessThan(input.byteLength);
      expect(result.width).toBeLessThanOrEqual(1600);
      expect(result.height).toBeLessThanOrEqual(1600);

      const saved = await readFile(join(root, result.filePath));
      const metadata = await sharp(saved).metadata();
      expect(metadata.format).toBe('webp');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('keeps sensitive photos private by not returning a public URL', async () => {
    const root = await mkdtemp(join(tmpdir(), 'nexppf-photo-storage-'));
    try {
      const storage = createLocalWarrantyPhotoStorage({ rootDir: root, maxBytes: 5_000_000, maxDimension: 1600 });
      const result = await storage.saveWarrantyPhoto({
        warrantyId: 'warranty-123',
        photoType: 'license_plate',
        originalName: 'plate.png',
        mimeType: 'image/png',
        bytes: await createJpegBuffer(800, 600),
        uploadedBy: 'dealer-user-1',
      });

      expect(result.publicUrl).toBeNull();
      expect(result.filePath).toBe('warranties/warranty-123/license_plate.webp');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('rejects unsupported file type, oversized file, unsupported photo type, and path traversal warranty_id', async () => {
    const root = await mkdtemp(join(tmpdir(), 'nexppf-photo-storage-'));
    try {
      const storage = createLocalWarrantyPhotoStorage({ rootDir: root, maxBytes: 10, maxDimension: 1600 });
      const bytes = await createJpegBuffer(100, 100);

      await expect(storage.saveWarrantyPhoto({
        warrantyId: 'warranty-123',
        photoType: 'car_front',
        originalName: 'bad.txt',
        mimeType: 'text/plain',
        bytes: Buffer.from('bad'),
        uploadedBy: 'dealer-user-1',
      })).rejects.toThrow(/Unsupported file type/i);

      await expect(storage.saveWarrantyPhoto({
        warrantyId: 'warranty-123',
        photoType: 'car_front',
        originalName: 'front.jpg',
        mimeType: 'image/jpeg',
        bytes,
        uploadedBy: 'dealer-user-1',
      })).rejects.toThrow(/File too large/i);

      await expect(storage.saveWarrantyPhoto({
        warrantyId: 'warranty-123',
        photoType: 'internal_secret' as never,
        originalName: 'front.jpg',
        mimeType: 'image/jpeg',
        bytes: await createJpegBuffer(50, 50),
        uploadedBy: 'dealer-user-1',
      })).rejects.toThrow(/Unsupported photo type/i);

      await expect(storage.saveWarrantyPhoto({
        warrantyId: '../escape',
        photoType: 'car_front',
        originalName: 'front.jpg',
        mimeType: 'image/jpeg',
        bytes: await createJpegBuffer(50, 50),
        uploadedBy: 'dealer-user-1',
      })).rejects.toThrow(/Invalid warranty_id/i);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('supports all approved warranty photo types including other', async () => {
    const root = await mkdtemp(join(tmpdir(), 'nexppf-photo-storage-'));
    try {
      const storage = createLocalWarrantyPhotoStorage({ rootDir: root, maxBytes: 5_000_000, maxDimension: 1600 });
      const photoTypes = ['car_front', 'license_plate', 'door_sticker', 'warranty_card', 'install_complete', 'other'] as const;

      for (const photoType of photoTypes) {
        const result = await storage.saveWarrantyPhoto({
          warrantyId: 'warranty-abc',
          photoType,
          originalName: `${photoType}.jpg`,
          mimeType: 'image/jpeg',
          bytes: await createJpegBuffer(100, 100),
          uploadedBy: 'dealer-user-1',
        });
        await expect(stat(join(root, result.filePath))).resolves.toBeTruthy();
        expect(result.filePath).toBe(`warranties/warranty-abc/${photoType}.webp`);
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
