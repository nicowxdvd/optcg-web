import Panel from "./Panel";
import DeckList from "./deck/DeckList";
import DeckToolbar from "./deck/DeckToolbar";
import LeaderSlot from "./deck/LeaderSlot";

export default function DeckPanel() {
  return (
    <Panel header={<DeckToolbar />}>
      <LeaderSlot />
      <DeckList />
    </Panel>
  );

}
