import Panel from "./Panel";

export default function CatalogPanel() {
  return (
    <Panel header={<h2 className="font-display text-xl text-fg">Catálogo</h2>}>
      {
      Array.from({ length: 60 }, (_, i) => (
        <p key={i} className="text-sm text-fg-muted">Carta {i + 1}</p>
      ))}
    </Panel>
  );
}