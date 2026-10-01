import type { DocumentRule } from "./types";

const SOCIETARY_TYPES = new Set(["CORPORATION", "LLC", "PARTNERSHIP", "OTHER"]);
const US_CODES = new Set(["US", "USA", "UNITED_STATES"]);

function hasCompanyType(values: { companyType?: string }): boolean {
  return Boolean(values.companyType);
}

function isSocietary(values: { companyType?: string }): boolean {
  return Boolean(values.companyType && SOCIETARY_TYPES.has(values.companyType));
}

function isUsIncorporation(values: { incorporationCountry?: string }): boolean {
  const code = (values.incorporationCountry ?? "").toUpperCase();
  return US_CODES.has(code);
}

function needsFatca(values: { incorporationCountry?: string; hasUsPresence?: boolean }): boolean {
  return isUsIncorporation(values) || Boolean(values.hasUsPresence);
}

/**
 * Reglas declarativas: agregar un documento nuevo es un objeto más aquí,
 * no un `if` en la UI. Varias reglas pueden apuntar al mismo `document.id`
 * (ej. FATCA por país de constitución y por presencia en EE. UU.); el
 * generador las fusiona en un solo ítem con todas las razones.
 */
export const documentRules: DocumentRule[] = [
  {
    document: {
      id: "identificacion-empresa",
      title: "Documento de identificación tributaria de la empresa",
      description: "Copia del RUC, NIT, RTN, RNC u otro identificador fiscal vigente.",
      category: "identidad",
    },
    reason: "Toda persona jurídica debe acreditar su identificación tributaria.",
    when: hasCompanyType,
  },
  {
    document: {
      id: "identificacion-representante",
      title: "Identificación del representante legal",
      description: "Copia de cédula, pasaporte u otro documento de identidad vigente del representante.",
      category: "identidad",
    },
    reason: "Se requiere identificar a quien firma y representa a la empresa.",
    when: hasCompanyType,
  },
  {
    document: {
      id: "comprobante-domicilio",
      title: "Comprobante de domicilio fiscal",
      description: "Recibo de servicios, contrato de arrendamiento o constancia de domicilio a nombre de la empresa.",
      category: "identidad",
    },
    reason: "Se pide para verificar el domicilio fiscal declarado.",
    when: hasCompanyType,
  },
  {
    document: {
      id: "acta-constitucion",
      title: "Acta / escritura de constitución",
      description: "Escritura pública o acta constitutiva inscrita, con sus reformas si las hay.",
      category: "constitucion",
    },
    reason: "El tipo de personería jurídica seleccionado requiere acreditar la constitución societaria.",
    when: isSocietary,
  },
  {
    document: {
      id: "estatutos",
      title: "Estatutos sociales",
      description: "Estatutos vigentes de la sociedad anónima, incluyendo reformas.",
      category: "constitucion",
    },
    reason: "Sociedad Anónima: los estatutos definen el gobierno corporativo y el objeto social.",
    when: (v) => v.companyType === "CORPORATION",
  },
  {
    document: {
      id: "pacto-social",
      title: "Pacto social / cláusulas de la SRL",
      description: "Pacto constitutivo o cláusulas de la sociedad de responsabilidad limitada.",
      category: "constitucion",
    },
    reason: "Sociedad de Responsabilidad Limitada: se requiere el pacto social.",
    when: (v) => v.companyType === "LLC",
  },
  {
    document: {
      id: "escritura-colectiva",
      title: "Escritura de sociedad colectiva",
      description: "Escritura de constitución de la sociedad colectiva e inscripción registral.",
      category: "constitucion",
    },
    reason: "Sociedad Colectiva: la escritura acredita socios y régimen de responsabilidad.",
    when: (v) => v.companyType === "PARTNERSHIP",
  },
  {
    document: {
      id: "documento-constitucion-equivalente",
      title: "Documento de constitución equivalente",
      description: "Instrumento que acredite la creación y vigencia de la entidad (según su figura jurídica).",
      category: "constitucion",
    },
    reason: "Personería jurídica «Otro»: se pide el equivalente al acta de constitución.",
    when: (v) => v.companyType === "OTHER",
  },
  {
    document: {
      id: "matricula-comerciante",
      title: "Matrícula de comerciante / registro de empresa individual",
      description: "Constancia de inscripción como comerciante individual o empresa unipersonal.",
      category: "constitucion",
    },
    reason: "Empresa Individual: no hay acta societaria; se pide la matrícula o registro del comerciante.",
    when: (v) => v.companyType === "SOLE_PROPRIETORSHIP",
  },
  {
    document: {
      id: "registro-mercantil",
      title: "Certificación de registro mercantil",
      description: "Certificación reciente de inscripción y vigencia en el registro mercantil o equivalente.",
      category: "constitucion",
    },
    reason: "Acredita que la entidad está inscrita y vigente en el registro correspondiente.",
    when: hasCompanyType,
  },
  {
    document: {
      id: "nombramiento-representante",
      title: "Nombramiento o poder del representante legal",
      description: "Acta de nombramiento, poder suficiente o certificación de facultades de representación.",
      category: "constitucion",
    },
    reason: "En sociedades se debe acreditar quién puede obligar a la empresa.",
    when: isSocietary,
  },
  {
    document: {
      id: "lista-accionistas",
      title: "Lista de accionistas o socios",
      description: "Nómina actualizada de accionistas/socios con porcentajes de participación.",
      category: "constitucion",
    },
    reason: "Necesaria para conocer la estructura de propiedad de la sociedad.",
    when: (v) => v.companyType === "CORPORATION" || v.companyType === "LLC",
  },
  {
    document: {
      id: "fatca",
      title: "Formulario FATCA (W-9 o W-8BEN-E)",
      description: "Declaración FATCA: W-9 si es persona estadounidense, o W-8BEN-E si es entidad extranjera con nexo en EE. UU.",
      category: "fiscal",
    },
    reason: "País de constitución: Estados Unidos.",
    when: isUsIncorporation,
  },
  {
    document: {
      id: "fatca",
      title: "Formulario FATCA (W-9 o W-8BEN-E)",
      description: "Declaración FATCA: W-9 si es persona estadounidense, o W-8BEN-E si es entidad extranjera con nexo en EE. UU.",
      category: "fiscal",
    },
    reason: "La empresa declaró presencia o nexo fiscal en Estados Unidos.",
    when: (v) => Boolean(v.hasUsPresence) && !isUsIncorporation(v),
  },
  {
    document: {
      id: "ein-certificate",
      title: "Constancia de EIN / US Tax ID",
      description: "Carta o constancia del Employer Identification Number asignado por el IRS.",
      category: "fiscal",
    },
    reason: "Se pidió porque hay presencia en EE. UU. o constitución en ese país.",
    when: needsFatca,
  },
  {
    document: {
      id: "articles-us",
      title: "Certificate of Incorporation / Articles of Organization (EE. UU.)",
      description: "Documento estatal de constitución (Articles of Incorporation o Articles of Organization) y Good Standing.",
      category: "constitucion",
    },
    reason: "Entidad constituida en Estados Unidos: se pide el instrumento estatal y vigencia (Good Standing).",
    when: isUsIncorporation,
  },
  {
    document: {
      id: "crs-residencia-fiscal",
      title: "Declaración CRS / residencia fiscal",
      description: "Autocertificación de residencia fiscal (CRS) cuando el país de constitución y el domicilio fiscal no coinciden.",
      category: "fiscal",
    },
    reason: "El país de constitución es distinto al país del domicilio fiscal.",
    when: (v) =>
      Boolean(v.incorporationCountry && v.addressCountry) &&
      v.incorporationCountry !== v.addressCountry,
  },
  {
    document: {
      id: "licencia-regulador",
      title: "Licencia o autorización del regulador",
      description: "Permiso, licencia o constancia de supervisión de la autoridad que regula a la entidad.",
      category: "regulatorio",
    },
    reason: "La empresa se declaró como entidad regulada.",
    when: (v) => Boolean(v.isRegulatedEntity),
  },
  {
    document: {
      id: "constancia-bolsa",
      title: "Constancia de listado en bolsa",
      description: "Evidencia de cotización pública y, de ser aplicable, últimos reportes a la bolsa o regulador de valores.",
      category: "regulatorio",
    },
    reason: "La empresa declaró cotizar en bolsa.",
    when: (v) => Boolean(v.isPubliclyTraded),
  },
  {
    document: {
      id: "estados-financieros",
      title: "Estados financieros recientes",
      description: "Estados financieros del último ejercicio (auditados si la figura o el producto lo exigen).",
      category: "financiero",
    },
    reason: "El producto solicitado (línea de crédito) requiere evaluar capacidad de pago.",
    when: (v) => v.requestedProductType === "LINE_OF_CREDIT",
  },
  {
    document: {
      id: "referencia-bancaria",
      title: "Carta de referencia bancaria",
      description: "Carta de un banco donde la empresa ya opera, con antigüedad y conducta de la cuenta.",
      category: "financiero",
    },
    reason: "La empresa declaró tener cuentas bancarias existentes.",
    when: (v) => Boolean(v.hasExistingBankAccounts),
  },
  {
    document: {
      id: "contrato-prestamo",
      title: "Contrato o constancia del financiamiento",
      description: "Contrato de préstamo o documento que acredite el origen de los fondos.",
      category: "financiero",
    },
    reason: "El origen de fondos declarado es financiamiento / préstamo.",
    when: (v) => v.sourceOfFunds === "LOAN",
  },
  {
    document: {
      id: "constancia-aportes",
      title: "Constancia de aportes de capital",
      description: "Evidencia de aportes de accionistas o socios (escrituras de aumento, comprobantes de capitalización).",
      category: "financiero",
    },
    reason: "El origen de fondos declarado es capital de accionistas.",
    when: (v) => v.sourceOfFunds === "SHAREHOLDER_CAPITAL",
  },
  {
    document: {
      id: "permiso-exportacion",
      title: "Permiso o registro de exportación",
      description: "Licencia, registro de exportador o documentos aduaneros que respalden la actividad de exportación.",
      category: "operativo",
    },
    reason: "La empresa declaró que exporta bienes.",
    when: (v) => Boolean(v.exportsGoods),
  },
  {
    document: {
      id: "permiso-importacion",
      title: "Permiso o registro de importación",
      description: "Licencia, registro de importador o documentos aduaneros que respalden la actividad de importación.",
      category: "operativo",
    },
    reason: "La empresa declaró que importa bienes.",
    when: (v) => Boolean(v.importsGoods),
  },
  {
    document: {
      id: "aviso-operacion-pa",
      title: "Aviso de Operación (Panamá)",
      description: "Aviso de Operación vigente emitido por el Ministerio de Comercio e Industrias (MICI).",
      category: "operativo",
    },
    reason: "Empresa constituida en Panamá: se requiere el Aviso de Operación.",
    when: (v) => v.incorporationCountry === "PA" && hasCompanyType(v),
  },
];
