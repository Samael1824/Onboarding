import { describe, expect, it } from "vitest";
import { generateDocumentChecklist } from "./generateDocumentChecklist";
import { companyFormDefaults } from "../schema/companyFormSchema";
import type { ChecklistFormSnapshot } from "./types";

function snapshot(partial: Partial<ChecklistFormSnapshot>): ChecklistFormSnapshot {
  return {
    companyType: companyFormDefaults.companyType,
    identificationType: companyFormDefaults.identificationType,
    incorporationCountry: companyFormDefaults.incorporationCountry,
    addressCountry: companyFormDefaults.addressCountry,
    isRegulatedEntity: companyFormDefaults.isRegulatedEntity,
    hasUsPresence: companyFormDefaults.hasUsPresence,
    isPubliclyTraded: companyFormDefaults.isPubliclyTraded,
    exportsGoods: companyFormDefaults.exportsGoods,
    importsGoods: companyFormDefaults.importsGoods,
    hasExistingBankAccounts: companyFormDefaults.hasExistingBankAccounts,
    requestedProductType: companyFormDefaults.requestedProductType,
    sourceOfFunds: companyFormDefaults.sourceOfFunds,
    ...partial,
  };
}

function ids(partial: Partial<ChecklistFormSnapshot>): string[] {
  return generateDocumentChecklist(snapshot(partial)).map((item) => item.id);
}

describe("generateDocumentChecklist", () => {
  it("no pide documentos societarios si aún no hay tipo de empresa", () => {
    expect(generateDocumentChecklist(snapshot({}))).toEqual([]);
  });

  it("pide acta de constitución y estatutos para Sociedad Anónima", () => {
    const result = ids({ companyType: "CORPORATION" });
    expect(result).toContain("acta-constitucion");
    expect(result).toContain("estatutos");
    expect(result).toContain("lista-accionistas");
    expect(result).not.toContain("matricula-comerciante");
  });

  it("pide pacto social para SRL y no estatutos de SA", () => {
    const result = ids({ companyType: "LLC" });
    expect(result).toContain("acta-constitucion");
    expect(result).toContain("pacto-social");
    expect(result).not.toContain("estatutos");
  });

  it("pide matrícula y no acta societaria para empresa individual", () => {
    const result = ids({ companyType: "SOLE_PROPRIETORSHIP" });
    expect(result).toContain("matricula-comerciante");
    expect(result).not.toContain("acta-constitucion");
    expect(result).not.toContain("nombramiento-representante");
  });

  it("pide FATCA y articles de EE. UU. si el país de constitución es US", () => {
    const items = generateDocumentChecklist(
      snapshot({ companyType: "CORPORATION", incorporationCountry: "US" })
    );
    const fatca = items.find((i) => i.id === "fatca");
    expect(fatca).toBeDefined();
    expect(fatca?.reasons).toContain("País de constitución: Estados Unidos.");
    expect(items.map((i) => i.id)).toContain("articles-us");
    expect(items.map((i) => i.id)).toContain("ein-certificate");
  });

  it("pide FATCA si hay presencia en EE. UU. aunque se constituyó en otro país", () => {
    const items = generateDocumentChecklist(
      snapshot({ companyType: "LLC", incorporationCountry: "NI", hasUsPresence: true })
    );
    const fatca = items.find((i) => i.id === "fatca");
    expect(fatca?.reasons.some((r) => r.includes("presencia"))).toBe(true);
    expect(items.map((i) => i.id)).not.toContain("articles-us");
  });

  it("no duplica FATCA si coinciden constitución en EE. UU. y presencia", () => {
    const items = generateDocumentChecklist(
      snapshot({ companyType: "CORPORATION", incorporationCountry: "US", hasUsPresence: true })
    );
    expect(items.filter((i) => i.id === "fatca")).toHaveLength(1);
  });

  it("acumula documentos de varias reglas a la vez", () => {
    const result = ids({
      companyType: "CORPORATION",
      incorporationCountry: "US",
      addressCountry: "NI",
      isRegulatedEntity: true,
      isPubliclyTraded: true,
      exportsGoods: true,
      importsGoods: true,
      hasExistingBankAccounts: true,
      requestedProductType: "LINE_OF_CREDIT",
      sourceOfFunds: "LOAN",
    });

    expect(result).toEqual(expect.arrayContaining([
      "acta-constitucion",
      "fatca",
      "crs-residencia-fiscal",
      "licencia-regulador",
      "constancia-bolsa",
      "permiso-exportacion",
      "permiso-importacion",
      "referencia-bancaria",
      "estados-financieros",
      "contrato-prestamo",
    ]));
  });

  it("pide Aviso de Operación solo si se constituyó en Panamá", () => {
    expect(ids({ companyType: "LLC", incorporationCountry: "PA" })).toContain("aviso-operacion-pa");
    expect(ids({ companyType: "LLC", incorporationCountry: "NI" })).not.toContain("aviso-operacion-pa");
  });
});
