"use client";

import Image from "next/image";
import { useEffect, type PointerEvent } from "react";
import type { Leader } from "@/types/leader";
import { useCardPreview } from "../card-preview/CardPreviewContext";
import { useDeck } from "../deck/DeckContext";



type Props = {
  leader: Leader;
};



export default function LeaderCard({ leader }: Props) {
  const { setLeader: setPreview } = useCardPreview();
  const { setLeader }             = useDeck();

  useEffect(() => {
    return () => setPreview(null);

  }, [setPreview]);



  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse")
      setPreview(leader);

  }



  return (
    <div
      onClick        = {() => setLeader(leader)}
      onPointerEnter = {handlePointerEnter}
      onPointerLeave = {() => setPreview(null)}
      className      = "relative cursor-pointer aspect-63/88 overflow-hidden rounded-card border border-border bg-surface-raised"
    >
      <Image
        src       = {leader.imageUrl}
        alt       = {`${leader.name} (${leader.cardCode})`}
        fill
        sizes     = "10vw"
        className = "object-cover"
      />
    </div>
  );

}
