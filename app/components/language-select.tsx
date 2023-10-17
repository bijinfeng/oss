import type { FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  triggerClassName?: string;
}

export const LanguageSelect: FC<LanguageSelectProps> = ({
  value,
  onChange,
  triggerClassName,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="zh">中文</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
};
