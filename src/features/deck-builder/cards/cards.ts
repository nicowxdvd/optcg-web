import { api }                from "@/lib/api";
import { Card }               from "@/types/card";
import { Paginated }          from "@/types/leader";
import { colorsOf }           from "@/features/deck-builder/lib/validate-deck";

const LIMIT = 20;



export type CardFilters = {
  color : string;
  page? : number;
};



export function getCards({ color, page }: CardFilters) {
  const params = new URLSearchParams({
    limit : String(LIMIT),
    color : colorsOf(color).join(",")
  });

  if (page && page >= 1)
    params.set("page", String(page));

  return api.get<Paginated<Card>>(`/cards?${params}`);

}