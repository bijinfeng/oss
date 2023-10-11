import type {
  ActionFunctionArgs,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createThemeCookie } from "~/lib/theme.server";

export const loader: LoaderFunction = async () => {
  return redirect("/");
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const { theme = "system" } = await request.json();
  return createThemeCookie(request, theme);
};
