import { describe, expect, it } from 'vitest';
import { authenticateUser, createPasswordHash, listVisibleWarrantyRecords } from '@/lib/auth';
import type { AuthRepository, WarrantyRecordForAccess } from '@/lib/auth';

const warrantyRecords: WarrantyRecordForAccess[] = [
  { id: 'warranty-a', dealerId: 'dealer-a', serialCode: 'B-1196MXY0401175Q' },
  { id: 'warranty-b', dealerId: 'dealer-b', serialCode: 'P-1196MXY0401176Q' },
];

describe('POC-005 auth and role isolation', () => {
  it('authenticates admin and redirects to /admin without exposing password hash', async () => {
    const passwordHash = await createPasswordHash('correct-password');
    const repository: AuthRepository = {
      async findUserByEmailOrPhone() {
        return { id: 'admin-1', name: 'Admin', email: 'admin@nexppf.test', phone: '0800000000', passwordHash, role: 'admin', dealerId: null, status: 'active' };
      },
      async listWarrantyRecords() {
        return warrantyRecords;
      },
    };

    const result = await authenticateUser({ identifier: 'admin@nexppf.test', password: 'correct-password' }, repository);
    expect(result).toEqual({ ok: true, session: { userId: 'admin-1', role: 'admin', dealerId: null, redirectTo: '/admin' } });
    expect(JSON.stringify(result)).not.toContain(passwordHash);
  });

  it('authenticates dealer and redirects to /dealer', async () => {
    const passwordHash = await createPasswordHash('dealer-password');
    const repository: AuthRepository = {
      async findUserByEmailOrPhone() {
        return { id: 'dealer-user-1', name: 'Dealer A', email: 'dealer@nexppf.test', phone: '0811111111', passwordHash, role: 'dealer', dealerId: 'dealer-a', status: 'active' };
      },
      async listWarrantyRecords() {
        return warrantyRecords;
      },
    };

    const result = await authenticateUser({ identifier: '0811111111', password: 'dealer-password' }, repository);
    expect(result).toEqual({ ok: true, session: { userId: 'dealer-user-1', role: 'dealer', dealerId: 'dealer-a', redirectTo: '/dealer' } });
  });

  it('rejects wrong password and suspended user', async () => {
    const passwordHash = await createPasswordHash('correct-password');
    const repository: AuthRepository = {
      async findUserByEmailOrPhone(identifier) {
        return { id: 'user-1', name: 'User', email: identifier, phone: null, passwordHash, role: 'dealer', dealerId: 'dealer-a', status: identifier.includes('suspended') ? 'suspended' : 'active' };
      },
      async listWarrantyRecords() {
        return warrantyRecords;
      },
    };

    await expect(authenticateUser({ identifier: 'dealer@nexppf.test', password: 'wrong' }, repository)).resolves.toEqual({ ok: false, reason: 'Invalid credentials' });
    await expect(authenticateUser({ identifier: 'suspended@nexppf.test', password: 'correct-password' }, repository)).resolves.toEqual({ ok: false, reason: 'User is not active' });
  });

  it('lets admin see all warranty records but dealer only own records', async () => {
    const repository: AuthRepository = {
      async findUserByEmailOrPhone() {
        return null;
      },
      async listWarrantyRecords() {
        return warrantyRecords;
      },
    };

    await expect(listVisibleWarrantyRecords({ userId: 'admin-1', role: 'admin', dealerId: null }, repository)).resolves.toEqual(warrantyRecords);
    await expect(listVisibleWarrantyRecords({ userId: 'dealer-user-1', role: 'dealer', dealerId: 'dealer-a' }, repository)).resolves.toEqual([warrantyRecords[0]]);
  });

  it('rejects dealer session without dealer_id', async () => {
    const repository: AuthRepository = {
      async findUserByEmailOrPhone() {
        return null;
      },
      async listWarrantyRecords() {
        return warrantyRecords;
      },
    };

    await expect(listVisibleWarrantyRecords({ userId: 'bad-dealer', role: 'dealer', dealerId: null }, repository)).rejects.toThrow(/dealer_id/i);
  });
});
