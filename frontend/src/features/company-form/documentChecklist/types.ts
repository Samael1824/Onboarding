import type { CompanyFormValues } from "../schema/companyFormSchema";

export type DocumentCategory =
  | "constitucion"
  | "identidad"
  | "fiscal"
  | "regulatorio"
  | "operativo"
  | "financiero";

export interface DocumentDefinition {
  id: string;
  title: string;
  description: string;
  category: DocumentCategory;
}

export interface ChecklistItem extends DocumentDefinition {
  /** Explicación de por qué se pidió este documento, según las respuestas. */
  reasons: string[];
}

/** Campos que disparan reglas. El resto del formulario no afecta la lista. */
export type ChecklistFormSnapshot = Pick<
  CompanyFormValues,
  | "companyType"
  | "identificationType"
  | "incorporationCountry"
  | "addressCountry"
  | "isRegulatedEntity"
  | "hasUsPresence"
  | "isPubliclyTraded"
  | "exportsGoods"
  | "importsGoods"
  | "hasExistingBankAccounts"
  | "requestedProductType"
  | "sourceOfFunds"
>;

export interface DocumentRule {
  document: DocumentDefinition;
  reason: string;
  when: (values: ChecklistFormSnapshot) => boolean;
}
