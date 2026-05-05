import { mkdir, writeFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import sharp from 'sharp';

export const WARRANTY_PHOTO_TYPES = [
  'car_front',
  'license_plate',
  'door_sticker',
  'warranty_card',
  'install_complete',
  'other',
] as const;

export type WarrantyPhotoType = (typeof WARRANTY_PHOTO_TYPES)[number];

export type SaveWarrantyPhotoInput = {
  warrantyId: string;
  photoType: WarrantyPhotoType;
  originalName: string;
  mimeType: string;
  bytes: Buffer;
  uploadedBy: string;
};

export type WarrantyPhotoMetadata = {
  warrantyId: string;
  photoType: WarrantyPhotoType;
  filePath: string;
  publicUrl: null;
  mimeType: 'image/webp';
  fileSize: number;
  width: number;
  height: number;
  uploadedBy: string;
  createdAt: string;
};

export type LocalWarrantyPhotoStorageOptions = {
  rootDir: string;
  maxBytes: number;
  maxDimension: number;
};

export type WarrantyPhotoStorage = {
  saveWarrantyPhoto(input: SaveWarrantyPhotoInput): Promise<WarrantyPhotoMetadata>;
};

const SUPPORTED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const SAFE_ID_PATTERN = /^[A-Za-z0-9_-]+$/;

export function createLocalWarrantyPhotoStorage(options: LocalWarrantyPhotoStorageOptions): WarrantyPhotoStorage {
  return {
    async saveWarrantyPhoto(input: SaveWarrantyPhotoInput): Promise<WarrantyPhotoMetadata> {
      validateWarrantyId(input.warrantyId);
      validatePhotoType(input.photoType);
      validateMimeType(input.mimeType);
      validateFileSize(input.bytes, options.maxBytes);

      const relativeDirectory = join('warranties', input.warrantyId);
      const fileName = `${input.photoType}.webp`;
      const relativePath = normalize(join(relativeDirectory, fileName));

      if (relativePath.startsWith('..') || relativePath.includes('/../')) {
        throw new Error('Invalid storage path');
      }

      const absoluteDirectory = join(options.rootDir, relativeDirectory);
      const absolutePath = join(options.rootDir, relativePath);

      const compressed = await sharp(input.bytes)
        .rotate()
        .resize({ width: options.maxDimension, height: options.maxDimension, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78 })
        .toBuffer();

      validateFileSize(compressed, options.maxBytes);
      const metadata = await sharp(compressed).metadata();
      if (!metadata.width || !metadata.height) {
        throw new Error('Could not read compressed image metadata');
      }

      await mkdir(absoluteDirectory, { recursive: true });
      await writeFile(absolutePath, compressed, { flag: 'w' });

      return {
        warrantyId: input.warrantyId,
        photoType: input.photoType,
        filePath: toPortablePath(relativePath),
        publicUrl: null,
        mimeType: 'image/webp',
        fileSize: compressed.byteLength,
        width: metadata.width,
        height: metadata.height,
        uploadedBy: input.uploadedBy,
        createdAt: new Date().toISOString(),
      };
    },
  };
}

function validateWarrantyId(warrantyId: string): void {
  if (!SAFE_ID_PATTERN.test(warrantyId)) {
    throw new Error('Invalid warranty_id');
  }
}

function validatePhotoType(photoType: string): asserts photoType is WarrantyPhotoType {
  if (!WARRANTY_PHOTO_TYPES.includes(photoType as WarrantyPhotoType)) {
    throw new Error('Unsupported photo type');
  }
}

function validateMimeType(mimeType: string): void {
  if (!SUPPORTED_MIME_TYPES.has(mimeType)) {
    throw new Error('Unsupported file type');
  }
}

function validateFileSize(bytes: Buffer, maxBytes: number): void {
  if (bytes.byteLength > maxBytes) {
    throw new Error('File too large');
  }
}

function toPortablePath(path: string): string {
  return path.split('\\').join('/');
}
