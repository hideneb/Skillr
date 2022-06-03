export enum StripeAccountStatus {
  ACCOUNT_CREATED = 0,
  DONE_ONBOARDING = 1,
  PENDING_VERIFICATION = 2,
  MISSING_INFORMATION = 3,
  ENABLED = 4,
}

export type PayoutMethod = {
  type: string;
  last4: string;
};

export type StripeLink = {
  url: string;
};
