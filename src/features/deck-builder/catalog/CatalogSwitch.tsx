"use client";

import { ReactNode } from "react";
import { useDeck } from "../deck/DeckContext";
import CardCatalog from "./CardCatalog";



type Props = {
  leaders : ReactNode;
};



export default function CatalogSwitch({ leaders }: Props) {
  const { leader } = useDeck();

  return leader ? <CardCatalog /> : leaders;

}