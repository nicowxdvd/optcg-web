
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-header">
        <div className="mx-auto flex h-full w-full max-w-(--breakpoint-2xl) items-center px-6">
            <Link href="/" className="flex items-center gap-2 font-display text-xl text-fg">
                <Image src="/logo.svg" alt="" width={32} height={32} className="shrink-0" />
                OPlay<span className="text-gold">TCG</span>
            </Link>
            <NavLinks />
            <SocialLinks />
            <ThemeToggle />
        </div>
    </header>
  )
}
