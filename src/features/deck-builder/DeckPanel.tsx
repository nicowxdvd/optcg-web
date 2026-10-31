import Panel from "./Panel";
import DeckList from "./deck/DeckList";
import DeckStatus from "./deck/DeckStatus";
import DeckToolbar from "./deck/DeckToolbar";
import LeaderSlot from "./deck/LeaderSlot";

export default function DeckPanel() {
  return (
    <Panel
      header={
        <div className="flex flex-col gap-2">
          <DeckToolbar />
          <DeckStatus />
        </div>
      }
    >
      <LeaderSlot />
      <DeckList />
    </Panel>
  );

}
