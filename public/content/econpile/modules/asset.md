# Asset

Asset tracks company-owned equipment and its hierarchy. It is separate from customer equipment and from tools, though all are equipment-domain concepts in the codebase.

## Main relationships

- **Own Asset** is the top-level company-owned asset.
- **Sub Asset** belongs beneath an own asset.
- Both can carry specifications, warranty, history, maintenance cost, and QR-driven public service/checklist capability where configured.

Asset changes have wide impact: visits, maintenance records, warranty, inspections, QR portal, reports, and parent aggregates. Preserve parent/child integrity and do not delete assets with operational history.
