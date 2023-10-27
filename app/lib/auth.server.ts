import { redirect } from "@vercel/remix";

import { getSession } from "./session.server";
import httpClient from "./http";

export async function checkAuthSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const jwt = session.get("jwt");

  if (!jwt) {
    throw redirect("/login", 302);
  }

  httpClient.setJwtToken(jwt);

  return session;
}

export async function setAuthSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const jwt = formData.get("jwt");
  const userId = formData.get("userId");

  if (!userId || !jwt) {
    throw new Response("Not Found", { status: 404 });
  }

  session.set("user-id", userId as string);
  session.set("jwt", jwt as string);

  return session;
}
