// Drizzle-backed implementation of LeadRepository + DealerApplicationRepository.
// Tests use mocks (see tests/lead-capture.test.ts). Server Actions import these.

import type {
  DealerApplicationInput,
  DealerApplicationRecord,
  DealerApplicationRepository,
  LeadInput,
  LeadRecord,
  LeadRepository,
} from '@/lib/lead-capture';
import { getDb } from '../client';
import { dealerApplications, leads } from '../schema';

export const drizzleLeadRepository: LeadRepository = {
  async createLead(input: LeadInput): Promise<LeadRecord> {
    const db = getDb();
    const [row] = await db
      .insert(leads)
      .values({
        formType: input.formType,
        name: input.name,
        phone: input.phone,
        line: input.line,
        email: input.email,
        province: input.province,
        vehicle: input.vehicle,
        productInterest: input.productInterest,
        contactType: input.contactType,
        message: input.message,
        sourcePage: input.sourcePage,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        consentAt: new Date(),
      })
      .returning({
        id: leads.id,
        formType: leads.formType,
        status: leads.status,
        createdAt: leads.createdAt,
      });
    return {
      id: row.id,
      formType: row.formType as LeadRecord['formType'],
      status: row.status as LeadRecord['status'],
      createdAt: row.createdAt,
    };
  },
};

export const drizzleDealerApplicationRepository: DealerApplicationRepository = {
  async createDealerApplication(input: DealerApplicationInput): Promise<DealerApplicationRecord> {
    const db = getDb();
    const [row] = await db
      .insert(dealerApplications)
      .values({
        businessName: input.businessName,
        ownerName: input.ownerName,
        phone: input.phone,
        line: input.line,
        email: input.email,
        province: input.province,
        experience: input.experience,
        currentServices: input.currentServices,
        notes: input.notes,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        consentAt: new Date(),
      })
      .returning({
        id: dealerApplications.id,
        status: dealerApplications.status,
        createdAt: dealerApplications.createdAt,
      });
    return {
      id: row.id,
      status: row.status as DealerApplicationRecord['status'],
      createdAt: row.createdAt,
    };
  },
};
