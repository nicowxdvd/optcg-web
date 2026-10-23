
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-header">
        <div className="mx-auto flex h-full w-full max-w-(--breakpoint-2xl) items-center px-6">
            <Link href="/" className='font-display text-xl text-fg'>
                OP<span className="text-gold">TCG</span>
            </Link>
        </div>

    </header>
  )
}
