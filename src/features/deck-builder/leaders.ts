import { api } from "@/lib/api";
import { Leader, Paginated } from "@/types/leader";

const LIMIT        = 20;
const CODE_PATTERN = /^[A-Z]{1,4}\d{0,2}-\d+/i;



export type LeaderFilters = {
  q?     : string;
  color? : string;
  page?  : string;
};



export function getLeaders({ q, color, page }: LeaderFilters) {
    const params     = new URLSearchParams({ limit: String(LIMIT) });
    const search     = q?.trim();
    const pageNumber = Number(page);

    if (search) 
        params.set(CODE_PATTERN.test(search) ? "code" : "name", search);

    if (color) 
        params.set("color", color);

    if (Number.isInteger(pageNumber) && pageNumber >= 1) 
        params.set("page", String(pageNumber));

    return api.get<Paginated<Leader>>(`/leaders?${params}`);
}