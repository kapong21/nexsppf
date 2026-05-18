-- Spec v5.2 follow-up — anti-spam observability on public form submissions.
-- Captures the originating IP and user agent so abuse can be retroactively
-- audited and blocked at the perimeter. Both nullable: historic rows + private
-- network proxies that strip headers must continue to insert without error.

ALTER TABLE leads
  ADD COLUMN ip_address text,
  ADD COLUMN user_agent text;

ALTER TABLE dealer_applications
  ADD COLUMN ip_address text,
  ADD COLUMN user_agent text;

CREATE INDEX leads_ip_address_idx ON leads(ip_address);
CREATE INDEX dealer_applications_ip_address_idx ON dealer_applications(ip_address);
