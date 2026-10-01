import { httpClient } from "@/shared/services/httpClient";
import type { CountryCode } from "@/shared/validation/countryRules";

export interface ApplicationSummary {
  applicationId: string;
  applicationNumber: string;
  countryCode: string;
  status: string;
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export async function getMyApplications(): Promise<ApplicationSummary[]> {
  const { data } = await httpClient.get<ApplicationSummary[]>("/onboarding/mine");
  return data;
}

export async function createApplication(countryCode: CountryCode): Promise<ApplicationSummary> {
  const { data } = await httpClient.post<ApplicationSummary>("/onboarding", { countryCode });
  return data;
}
