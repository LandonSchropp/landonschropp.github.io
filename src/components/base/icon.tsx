import ChessComIcon from "@/images/data/chess-com.svg?react";
import EmailIcon from "@/images/data/email.svg?react";
import GitHubIcon from "@/images/data/github.svg?react";
import LinkedInIcon from "@/images/data/linkedin.svg?react";
import { Briefcase, Brain, ExternalLink, Activity, Code, Star } from "lucide-react";

const SVG_ICONS = {
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  chessCom: ChessComIcon,
} as const;

const LUCIDE_ICONS = {
  externalLink: ExternalLink,
  brain: Brain,
  briefcase: Briefcase,
  activity: Activity,
  code: Code,
  star: Star,
};

const ICONS = { ...SVG_ICONS, ...LUCIDE_ICONS } as const;

type BaseIconProps = {
  name: keyof typeof SVG_ICONS | keyof typeof LUCIDE_ICONS;
  className?: string;
};

type HiddenIconProps = BaseIconProps & {
  hidden: true;
  alt?: never;
};

type AltIconProps = BaseIconProps & {
  hidden?: false;
  alt: string;
};

type IconProps = HiddenIconProps | AltIconProps;

export function Icon({ name, hidden, alt, className }: IconProps) {
  const isLucideIcon = name in LUCIDE_ICONS;
  const IconComponent = ICONS[name];
  const props = hidden ? { "aria-hidden": true } : {};

  if (isLucideIcon) {
    return (
      <IconComponent className={`inline-block align-middle ${className}`} {...props}>
        {alt && <title>{alt}</title>}
      </IconComponent>
    );
  }

  return (
    <IconComponent
      className={`inline-block h-3.6 w-3.6 fill-[currentColor] align-middle ${className}`}
      title={alt}
      {...props}
    />
  );
}
