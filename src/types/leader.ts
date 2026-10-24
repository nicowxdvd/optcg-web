export type Leader = {
  externalId : string;
  cardCode   : string;
  name       : string;
  rarity     : string;
  color      : string;
  life       : number;
  power      : number;
  attribute  : string;
  effect     : string;
  imageUrl   : string;
  set        : string;
  traits     : string[];
};



export type Paginated<T> = {
  items      : T[];
  total      : number;
  page       : number;
  totalPages : number;
};