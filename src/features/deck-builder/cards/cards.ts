import { api }                from "@/lib/api";
import { Card, CardType }     from "@/types/card";
import { Paginated }          from "@/types/leader";
import { colorsOf }           from "@/features/deck-builder/lib/validate-deck";

const LIMIT = 20;



export type CardFilters = {
  color  : string;
  page?  : number;
  q?     : string;
  type?  : CardType;
  cost?  : number;
};



export function getCards({ color, page, q, type, cost }: CardFilters) {
  const params = new URLSearchParams({
    limit : String(LIMIT),
    color : colorsOf(color).join(",")
  });

  if (page && page >= 1)
    params.set("page", String(page));

  if (q)
    params.set("q", q);

  if (type)
    params.set("type", type);

  if (cost !== undefined)
    params.set("cost", String(cost));

  return api.get<Paginated<Card>>(`/cards?${params}`);

}