import { CATEGORY_LABELS, type ChecklistItem } from "../documentChecklist";

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as ChecklistItem["category"][];

export function DocumentChecklistSection({ items }: { items: ChecklistItem[] }) {
  const grouped = CATEGORY_ORDER
    .map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="documents" className="card">
      <div className="card-header">
        <h2><span className="section-index">7.</span>Documentos requeridos</h2>
        {items.length > 0 && (
          <span className="badge badge-review">{items.length} documento{items.length === 1 ? "" : "s"}</span>
        )}
      </div>

      <p>
        Esta lista se arma sola según lo que ya respondiste: tipo de personería,
        país de constitución, presencia en EE. UU., actividad y producto solicitado.
        Cambia un dato arriba y la lista se actualiza.
      </p>

      {items.length === 0 ? (
        <div className="empty-state" style={{ padding: "1.5rem 0.5rem" }}>
          <h3>Aún no hay documentos para pedir</h3>
          <p>Selecciona el tipo de sociedad para generar el checklist.</p>
        </div>
      ) : (
        grouped.map((group) => (
          <div key={group.category} className="checklist-group">
            <h3 className="checklist-group-title">{CATEGORY_LABELS[group.category]}</h3>
            <ul className="checklist-list">
              {group.items.map((item) => (
                <li key={item.id} className="checklist-item">
                  <div className="checklist-item-mark" aria-hidden="true" />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <ul className="checklist-reasons">
                      {item.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}
