"use client";

import Image from "next/image";
import { useEffect, type PointerEvent } from "react";
import type { Leader } from "@/types/leader";
import { useCardPreview } from "../card-preview/CardPreviewContext";



  type Props = {
    leader: Leader;
  };



  export default function LeaderCard({ leader }: Props) {
    const { setLeader } = useCardPreview();


    
    useEffect(() => {
      return () => setLeader(null);
    }, [setLeader]);



    function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
      if (event.pointerType === "mouse")
        setLeader(leader);
    }



    return (
      <div
        onPointerEnter = {handlePointerEnter}
        onPointerLeave = {() => setLeader(null)}
        className      = "relative aspect-63/88 overflow-hidden rounded-card border border-border bg-surface-raised"
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