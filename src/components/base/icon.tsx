import ChessComIcon from "@/images/data/chess-com.svg?react";
import EmailIcon from "@/images/data/email.svg?react";
import GitHubIcon from "@/images/data/github.svg?react";
import LinkedInIcon from "@/images/data/linkedin.svg?react";

const ICONS = {
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  chessCom: ChessComIcon,
} as const;

type IconProps = {
  name: keyof typeof ICONS;
  alt: string;
  className?: string;
};

export function Icon({ name, alt, className }: IconProps) {
  const IconComponent = ICONS[name];

  return (
    <IconComponent
      className={`inline-block h-3.6 w-3.6 fill-[currentColor] align-middle ${className}`}
      title={alt}
    />
  );
}
