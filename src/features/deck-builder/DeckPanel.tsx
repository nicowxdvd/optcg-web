import Panel from "./Panel";
import LeaderSlot from "./deck/LeaderSlot";

export default function DeckPanel() {
  return (
    <Panel header={<h2 className="font-display text-xl text-fg">Mazo</h2>}>
      <LeaderSlot />
    </Panel>
  );
}