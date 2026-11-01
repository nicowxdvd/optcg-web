import type { Card } from "@/types/card";
import type { Leader } from "@/types/leader";

export const makeLeader = (overrides: Partial<Leader> = {}): Leader => ({
  externalId : "l1",
  cardCode   : "OP01-001",
  name       : "Luffy",
  rarity     : "L",
  color      : "Red",
  life       : 5,
  power      : 5000,
  attribute  : "Strike",
  effect     : "",
  imageUrl   : "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-001.png",
  set        : "OP01",
  traits     : [],
  ...overrides,
});

export const makeCard = (overrides: Partial<Card> = {}): Card => ({
  externalId    : "c1",
  cardCode      : "OP01-002",
  name          : "Zoro",
  type          : "CHARACTER",
  rarity        : "C",
  color         : "Red",
  cost          : 2,
  power         : 4000,
  counterValue  : 1000,
  attribute     : "Slash",
  effect        : null,
  triggerEffect : null,
  imageUrl      : "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-002.png",
  ...overrides,
});
