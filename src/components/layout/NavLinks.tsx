"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/ranking", label: "Ranking" },
  { href: "/deck-builder", label: "Deck Builder" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return  (
        <nav className="ml-8 flex h-full items-center gap-6">
            {
                links.map(({ href, label }) => {
                    const active = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                        <Link
                            key          = {href}
                            href         = {href}
                            aria-current = {active ? "page" : undefined}
                            className    = {`flex h-full items-center border-b-2 text-sm transition-colors ${active ? "border-gold text-fg" : "border-transparent text-fg-muted hover:text-fg"}`}>
                         {label}
                        </Link>
                    );
                })
            }
        
        </nav>
    )
}
