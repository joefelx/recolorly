import { Github, LucideIcon, Mail, Twitter } from "lucide-react";

export type FooterLink = {
  href: string;
  name: string;
  icon: LucideIcon;
};

export const FOOTER_LINKS: FooterLink[] = [
  {
    href: "https://twitter.com/joefelix_a",
    name: "Twitter",
    icon: Twitter,
  },

  {
    href: "https://github.com/joefelx/recolorly",
    name: "Github",
    icon: Github,
  },

  {
    href: "mailto:joefelixdev@gmail.com",
    name: "Mail",
    icon: Mail,
  },
];
