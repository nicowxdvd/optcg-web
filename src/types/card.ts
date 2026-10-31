export type CardType = "LEADER" | "CHARACTER" | "EVENT" | "STAGE";



export type Card = {
  externalId    : string;
  cardCode      : string;
  name          : string;
  type          : CardType;
  rarity        : string;
  color         : string;
  cost          : number | null;
  power         : number | null;
  counterValue  : number | null;
  attribute     : string | null;
  effect        : string | null;
  triggerEffect : string | null;
  imageUrl      : string;
};
