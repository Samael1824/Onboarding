const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  Draft: { label: "Borrador", className: "badge-draft" },
  InProgress: { label: "En progreso", className: "badge-inprogress" },
  ReadyForReview: { label: "Lista para revisión", className: "badge-review" },
  Submitted: { label: "Enviada", className: "badge-review" },
  UnderReview: { label: "En revisión", className: "badge-review" },
  RequiresChanges: { label: "Requiere cambios", className: "badge-rejected" },
  Approved: { label: "Aprobada", className: "badge-approved" },
  Rejected: { label: "Rechazada", className: "badge-rejected" },
};

export function StatusBadge({ status }: { status: string }) {
  const info = STATUS_LABELS[status] ?? { label: status, className: "badge-draft" };
  return <span className={`badge ${info.className}`}>{info.label}</span>;
}
