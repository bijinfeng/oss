import { useTranslation } from "react-i18next";
import { useRef } from "react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import Form, { FormInstance } from "@/components/form";
import { LanguageSelect } from "@/components/language-select";
import type { Theme } from "@/interface";
import { ThemeSwitch } from "@/components/theme-switch";

interface FormValue {
  language: string;
  theme: Theme;
}

export const AppearanceForm = () => {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const formRef = useRef<FormInstance<FormValue>>(null);

  const onSubmit = () => {
    const values = formRef.current!.getValues();
    setTheme(values.theme);
    i18n.changeLanguage(values.language);
  };

  return (
    <Form<FormValue> form={formRef} defaultValues={{ theme, language: i18n.language }}>
      <Form.Item name="language" label="Language">
        <LanguageSelect
          triggerClassName="w-[200px]"
        />
      </Form.Item>
      <Form.Item name="theme" label="Theme" subTitle="Select the theme for the dashboard.">
        <ThemeSwitch />
      </Form.Item>

      <Button onClick={onSubmit}>Update preferences</Button>
    </Form>
  );
};
