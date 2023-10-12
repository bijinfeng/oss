import { redirect } from "@vercel/remix";

import { api } from "./appwrite";
import { getSession } from "./session.server";

export async function checkAuthSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const jwt = session.get("jwt");

  if (!jwt) {
    throw redirect("/login", 302);
  }

  api.setJWT(jwt);

  return session;
}
