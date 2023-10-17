import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { LanguageSelect } from "~/components/language-select";
import { useTheme } from "./theme-provider";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

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

export const AppearanceForm = () => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      language: i18n.language,
      theme,
    },
  });

  const onSubmit = (data: AppearanceFormValues) => {
    setTheme(data.theme);
    i18n.changeLanguage(data.language);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <LanguageSelect
                  value={field.value}
                  onChange={field.onChange}
                  triggerClassName="w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <LightCard />
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <DarkCard />
                    </div>

                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="system" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <SystemCard />
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      System
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit">Update preferences</Button>
      </form>
    </Form>
  );
};
