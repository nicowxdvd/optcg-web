"use client";

import Image from "next/image";
import { useCardPreview } from "./CardPreviewContext";



export default function CardPreview() {
  const { leader } = useCardPreview();

  if (!leader)
    return null;

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-20 aspect-63/88 w-104 overflow-hidden rounded-card border border-border shadow-xl transition duration-150 starting:scale-95 starting:opacity-0">
      <Image
        src       = {leader.imageUrl}
        alt       = {`${leader.name} (${leader.cardCode})`}
        fill
        sizes     = "416px"
        className = "object-cover"
      />
    </div>
  );

}
