import { createCookieSessionStorage } from "@vercel/remix";

type SessionData = {
  "user-id": string;
  "ui-theme": string;
  jwt: string;
};

type SessionFlashData = {
  error: string;
};

export const sessionStore = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: process.env.SESSION_NAME || "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "E919649C3DE566D92F8E73FBD5DED"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStore;

export const getCurrentSession = (request: Request) => {
  const cookie = request.headers.get("cookie");
  return getSession(cookie);
};
