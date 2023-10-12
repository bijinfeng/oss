import { json } from "@remix-run/node";

import type { Theme } from "~/interface";

import { commitSession, getCurrentSession } from "./session.server";

// You can use any name for the session key
const THEME_PREFERENCE_KEY = "ui-theme";

export const createThemeCookie = async (request: Request, theme: string) => {
  const session = await getCurrentSession(request);
  session.set(THEME_PREFERENCE_KEY, theme);

  return json(
    { theme },
    {
      headers: new Headers({
        "Set-Cookie": await commitSession(session),
      }),
    }
  );
};

export const getThemeFromCookie = async (request: Request): Promise<Theme> => {
  const session = await getCurrentSession(request);
  return (session.get(THEME_PREFERENCE_KEY) as Theme) || "system";
};
