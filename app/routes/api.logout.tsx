import type { ActionFunctionArgs, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/lib/session.server";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  session.unset("user-id");
  session.unset("jwt");

  return redirect("/login", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
