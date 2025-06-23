import { LucideIcon, Palette, Zap, Shield } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const FEATURES: Feature[] = [
  {
    icon: Palette,
    title: "Precise Color Selection",
    desc: "Click on any pixel to select its exact color for replacement with advanced tolerance controls.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    desc: "Real-time color replacement with instant preview. No waiting, no delays - see changes immediately.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "All processing happens locally in your browser. Your images never leave your device.",
  },
];
