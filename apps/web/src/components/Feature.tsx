import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Feature({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-[#FC2D35]/50 transition-all duration-300 group">
      <CardHeader>
        <div className="w-12 h-12 bg-[#FC2D35]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FC2D35]/30 transition-colors">
          {icon}
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">{desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}
