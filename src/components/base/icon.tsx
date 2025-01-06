import ChessComIcon from "@/images/data/chess-com.svg?react";
import EmailIcon from "@/images/data/email.svg?react";
import GitHubIcon from "@/images/data/github.svg?react";
import LinkedInIcon from "@/images/data/linkedin.svg?react";
import BashIcon from "@/images/icons/bash.svg?react";
import GitIcon from "@/images/icons/git.svg?react";
import NeovimIcon from "@/images/icons/neovim.svg?react";
import RubyIcon from "@/images/icons/ruby.svg?react";
import TypeScriptIcon from "@/images/icons/typescript.svg?react";
import { Gem, Briefcase, Brain, ExternalLink, Activity, Code, Star, Terminal } from "lucide-react";

const SVG_ICONS = {
  bash: BashIcon,
  chessCom: ChessComIcon,
  email: EmailIcon,
  git: GitIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  neovim: NeovimIcon,
  ruby: RubyIcon,
  typescript: TypeScriptIcon,
} as const;

const LUCIDE_ICONS = {
  activity: Activity,
  brain: Brain,
  briefcase: Briefcase,
  code: Code,
  externalLink: ExternalLink,
  star: Star,
};

const ICONS = { ...SVG_ICONS, ...LUCIDE_ICONS } as const;

type BaseIconProps = {
  name: keyof typeof ICONS;
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
  const IconComponent = ICONS[name];
  const props = hidden ? { "aria-hidden": true } : {};

  if (name in LUCIDE_ICONS) {
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
