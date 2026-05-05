import bcrypt from 'bcryptjs';

export type UserRole = 'admin' | 'dealer';

export type AuthUserRecord = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  passwordHash: string;
  role: UserRole;
  dealerId: string | null;
  status: 'active' | 'suspended' | 'inactive';
};

export type AuthSession = {
  userId: string;
  role: UserRole;
  dealerId: string | null;
  redirectTo: '/admin' | '/dealer';
};

export type WarrantyRecordForAccess = {
  id: string;
  dealerId: string;
  serialCode: string;
};

export type AuthRepository = {
  findUserByEmailOrPhone(identifier: string): Promise<AuthUserRecord | null>;
  listWarrantyRecords(): Promise<WarrantyRecordForAccess[]>;
};

export type LoginInput = {
  identifier: string;
  password: string;
};

export type LoginResult =
  | { ok: true; session: AuthSession }
  | { ok: false; reason: 'Invalid credentials' | 'User is not active' | 'Dealer account is not linked to dealer_id' };

const PASSWORD_SALT_ROUNDS = 10;

export async function createPasswordHash(password: string): Promise<string> {
  return bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
}

export async function authenticateUser(input: LoginInput, repository: AuthRepository): Promise<LoginResult> {
  const user = await repository.findUserByEmailOrPhone(input.identifier.trim().toLowerCase());

  if (!user) {
    return { ok: false, reason: 'Invalid credentials' };
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) {
    return { ok: false, reason: 'Invalid credentials' };
  }

  if (user.status !== 'active') {
    return { ok: false, reason: 'User is not active' };
  }

  if (user.role === 'dealer' && !user.dealerId) {
    return { ok: false, reason: 'Dealer account is not linked to dealer_id' };
  }

  return {
    ok: true,
    session: {
      userId: user.id,
      role: user.role,
      dealerId: user.dealerId,
      redirectTo: user.role === 'admin' ? '/admin' : '/dealer',
    },
  };
}

export async function listVisibleWarrantyRecords(
  session: Pick<AuthSession, 'userId' | 'role' | 'dealerId'>,
  repository: AuthRepository,
): Promise<WarrantyRecordForAccess[]> {
  const records = await repository.listWarrantyRecords();

  if (session.role === 'admin') {
    return records;
  }

  if (!session.dealerId) {
    throw new Error('dealer_id is required for dealer access');
  }

  return records.filter((record) => record.dealerId === session.dealerId);
}
