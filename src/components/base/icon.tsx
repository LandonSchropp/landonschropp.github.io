import ChessComIcon from "@/images/data/chess-com.svg?react";
import EmailIcon from "@/images/data/email.svg?react";
import GitHubIcon from "@/images/data/github.svg?react";
import LinkedInIcon from "@/images/data/linkedin.svg?react";
import { ExternalLink } from "lucide-react";

const SVG_ICONS = {
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  chessCom: ChessComIcon,
} as const;

const LUCIDE_ICONS = {
  externalLink: ExternalLink,
};

const ICONS = { ...SVG_ICONS, ...LUCIDE_ICONS } as const;

type IconProps = {
  name: keyof typeof SVG_ICONS | keyof typeof LUCIDE_ICONS;
  alt: string;
  className?: string;
};

export function Icon({ name, alt, className }: IconProps) {
  const isLucideIcon = name in LUCIDE_ICONS;
  const IconComponent = ICONS[name];

  if (isLucideIcon) {
    return (
      <IconComponent className={`inline-block align-middle ${className}`}>
        <title>{alt}</title>
      </IconComponent>
    );
  }

  return (
    <IconComponent
      className={`inline-block h-3.6 w-3.6 fill-[currentColor] align-middle ${className}`}
      title={alt}
    />
  );
}
