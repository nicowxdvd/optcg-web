import { SiInstagram, SiTiktok, SiYoutube, SiX, SiThreads, SiFacebook } from "react-icons/si";

const links = [
  { href: "/", label: "Instagram", Icon: SiInstagram },
  { href: "/", label: "TikTok",    Icon: SiTiktok },
  { href: "/", label: "YouTube",   Icon: SiYoutube },
  { href: "/", label: "X",         Icon: SiX },
  { href: "/", label: "Threads",   Icon: SiThreads },
  { href: "/", label: "Facebook",  Icon: SiFacebook }
];

export const SocialLinks = () => {
  return (
     <div className="flex items-center gap-4">
        {
            links.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon size={18} />
                </a>
            ))
        }
    </div>
  )
}
