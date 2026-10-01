import { documentRules } from "./rules";
import type { ChecklistFormSnapshot, ChecklistItem } from "./types";

const CATEGORY_ORDER: ChecklistItem["category"][] = [
  "constitucion",
  "identidad",
  "fiscal",
  "regulatorio",
  "financiero",
  "operativo",
];

/**
 * Arma la lista de documentos a pedir según lo llenado en el formulario.
 * Ítems con el mismo id se fusionan (una sola fila, varias razones).
 */
export function generateDocumentChecklist(
  values: ChecklistFormSnapshot
): ChecklistItem[] {
  const byId = new Map<string, ChecklistItem>();

  for (const rule of documentRules) {
    if (!rule.when(values)) continue;

    const existing = byId.get(rule.document.id);
    if (existing) {
      if (!existing.reasons.includes(rule.reason)) {
        existing.reasons.push(rule.reason);
      }
      continue;
    }

    byId.set(rule.document.id, {
      ...rule.document,
      reasons: [rule.reason],
    });
  }

  return [...byId.values()].sort((a, b) => {
    const cat = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (cat !== 0) return cat;
    return a.title.localeCompare(b.title, "es");
  });
}
