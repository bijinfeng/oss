import { Dot } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LanguageSelect } from "@/components/language-select";

import packageJson from "../../package.json";

export const Footer = () => {
  const { i18n } = useTranslation();

  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="flex items-center text-sm leading-loose text-muted-foreground md:text-left">
          Copyright © 2023 kebai. All rights reserved.
          <Dot size={12} className="mx-2" />
          <a href="./changelog.html" className="link-secondary" rel="noopener">
            v{packageJson.version}
          </a>
        </p>
        <LanguageSelect
          value={i18n.language}
          onChange={i18n.changeLanguage}
          triggerClassName="w-32"
        />
      </div>
    </footer>
  );
};
