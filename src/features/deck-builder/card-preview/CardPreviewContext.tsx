 "use client"



import { createContext, ReactNode, useContext, useState } from "react";
import type { Leader } from "@/types/leader";



    type CardPreviewValue = {
        leader    : Leader | null;
        setLeader : (leader: Leader | null) => void;
    };



    const CardPreviewContext = createContext<CardPreviewValue | null>(null);



    export function CardPreviewProvider({ children }: { children: ReactNode }) {
        const [leader, setLeader] = useState<Leader | null>(null);

        return (
            <CardPreviewContext value={{ leader, setLeader }}>
            {children}
            </CardPreviewContext>
        );
    }



    export function useCardPreview() {
        const context = useContext(CardPreviewContext);

        if (!context)
            throw new Error("useCardPreview debe usarse dentro de CardPreviewProvider");

        return context;
    }
