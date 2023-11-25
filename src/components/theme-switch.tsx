import type { Theme } from "@/interface";
import type React from 'react';

import { cn } from "@/lib/utils";

const LightCard = () => (
  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
    </div>
    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
    </div>
    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
    </div>
  </div>
);

const DarkCard = () => (
  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
    </div>
    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
      <div className="h-4 w-4 rounded-full bg-slate-400" />
      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
    </div>
    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
      <div className="h-4 w-4 rounded-full bg-slate-400" />
      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
    </div>
  </div>
);

const SystemCard = () => (
  <div className="relative">
    <LightCard />
    <div
      className="absolute top-0 left-0 w-full h-full"
      style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
    >
      <DarkCard />
    </div>
  </div>
);

const themeCards: { label: string; value: Theme, card: React.FunctionComponent }[] = [
  {
    label: "Light",
    value: "light",
    card: LightCard,
  },
  {
    label: "Dark",
    value: "dark",
    card: DarkCard,
  },
  {
    label: "System",
    value: "system",
    card: SystemCard,
  }
];

interface ThemeSwitchProps {
  value?: Theme;
  onChange?: (value: Theme) => void;
}

export const ThemeSwitch = (props: ThemeSwitchProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 pt-2">
      {themeCards.map(item => (
        <div key={item.value}>
          <div
            className={cn("items-center rounded-md border-2 border-muted p-1 cursor-pointer", { "border-primary": props.value === item.value })}
            onClick={() => props.onChange?.(item.value)}
          >
            <item.card />
          </div>
          <span className="block w-full p-2 text-center font-normal">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
