import { httpClient } from "@/shared/services/httpClient";
import type { CompanyFormValues } from "../schema/companyFormSchema";

export async function getCompanyProfile(applicationId: string): Promise<Partial<CompanyFormValues>> {
  const { data } = await httpClient.get<Partial<CompanyFormValues>>(
    `/onboarding/${applicationId}/company`
  );
  return data;
}

export interface SaveCompanyProfileResult {
  applicationId: string;
  status: string;
  progressPercentage: number;
}

export async function saveCompanyProfile(
  applicationId: string,
  values: CompanyFormValues
): Promise<SaveCompanyProfileResult> {
  // Los campos numéricos usan "" como valor vacío en el form (para que el
  // input controlado no se queje); se normalizan a null antes de enviarlos.
  const payload = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value === "" ? null : value])
  );

  const { data } = await httpClient.patch<SaveCompanyProfileResult>(
    `/onboarding/${applicationId}/company`,
    payload
  );
  return data;
}
