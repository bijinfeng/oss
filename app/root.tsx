import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useFetcher,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@vercel/remix";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

import i18next from "~/i18next.server";
import stylesheet from "~/tailwind.css";
import { getThemeFromCookie } from "~/lib/theme.server";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { getEnv } from "~/lib/env.server";

import "@fontsource-variable/noto-sans-sc/wght.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  const theme = await getThemeFromCookie(request);
  const ENV = getEnv();

  return json({ locale, theme, ENV });
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function App() {
  const { locale, theme = "system", ENV } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const fetcher = useFetcher();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  const onThemeChange = (theme: string) => {
    fetcher.submit(
      { theme },
      {
        method: "post",
        encType: "application/json",
        action: "/api/toggleTheme",
      }
    );
  };

  return (
    <html lang={locale} dir={i18n.dir()} className={theme ?? "theme"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans">
        <ThemeProvider defaultTheme={theme} onThemeChange={onThemeChange}>
          <Outlet />
          <Toaster />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
