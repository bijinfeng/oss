import { useParams, useLocation, useFetcher } from "@remix-run/react";
import { useLayoutEffect } from "react";
import { redirect, type ActionFunctionArgs } from "@vercel/remix";

import { authProviderCallback } from "~/lib/request";
import { commitSession } from "~/lib/session.server";
import { setAuthSession } from "~/lib/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await setAuthSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const ConnectProviderRedirect = () => {
  const fetcher = useFetcher();
  const params = useParams<{ provider: string }>();
  const location = useLocation();

  useLayoutEffect(() => {
    if (params.provider && location.search) {
      authProviderCallback(params.provider, location.search).then((data) => {
        fetcher.submit(
          { userId: data.user.id, jwt: data.jwt },
          { method: "post" }
        );
      });
    }
  }, [params.provider, location.search, fetcher]);

  return null;
};

export default ConnectProviderRedirect;
