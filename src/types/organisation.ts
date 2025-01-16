export interface Organisation {
  orgId?: string;
  orgName: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  address: Address | null;
  email: string | null;
  subscription: string | null;
  status: OrganisationStatus;
  createdAt?: string;
  updatedAt?: string;
}
export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}
export type OrganisationStatus = "pending" | "verified" | "suspended" | "deactivated";
