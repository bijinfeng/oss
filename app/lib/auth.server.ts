import { redirect } from "@vercel/remix";

import { getSession } from "./session.server";
import httpClient from "./http";

export async function checkAuthSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const jwt = session.get("jwt");

  console.log("jwt: ", jwt);

  if (!jwt) {
    throw redirect("/login", 302);
  }

  httpClient.setJwtToken(jwt);

  return session;
}
