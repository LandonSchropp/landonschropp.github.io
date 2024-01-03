import BookIcon from "../images/icons/book.svg?react";
import EmailIcon from "../images/icons/email.svg?react";
import GitHubIcon from "../images/icons/github.svg?react";
import LinkedInIcon from "../images/icons/linkedin.svg?react";

const ICONS = {
  book: BookIcon,
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
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
