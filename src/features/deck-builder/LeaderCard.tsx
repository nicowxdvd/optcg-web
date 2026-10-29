import Image from "next/image";
import type { Leader } from "@/types/leader";

type Props = {
  leader: Leader;
};



export default function LeaderCard({ leader }: Props) {
  return (
    <div className="relative aspect-63/88 overflow-hidden rounded-card border border-border bg-surface-raised">
      <Image
        src={leader.imageUrl}
        alt={`${leader.name} (${leader.cardCode})`}
        fill
        sizes="10vw"
        className="object-cover"
      />
    </div>
  );
}