import { useFetcher } from "@remix-run/react";
import { redirect, type ActionFunctionArgs } from "@vercel/remix";

import { LoginForm, type FormValue } from "~/components/login-form";
import { AccountLayout } from "~/components/account-layout";
import { login } from "~/lib/request";
import { commitSession, getSession } from "~/lib/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const jwt = formData.get("jwt");
  const userId = formData.get("userId");

  if (!userId || !jwt) {
    throw new Response("Not Found", { status: 404 });
  }

  session.set("user-id", userId as string);
  session.set("jwt", jwt as string);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const Login = () => {
  const fetcher = useFetcher();

  // 登录成功后导航到首页
  const handleSubmit = async (value: FormValue) => {
    const data = await login(value.email, value.password);
    fetcher.submit({ userId: data.user.id, jwt: data.jwt }, { method: "post" });
  };

  const handleGithubLogin = () => {
    // api.createGithubOAuthSession(location.origin, `${location.origin}/login`);
  };

  const handleGoogleLogin = () => {};

  return (
    <AccountLayout
      title="Login to your account"
      flotLink={{ name: "Sign up", link: "/register" }}
    >
      <LoginForm
        onSubmit={handleSubmit}
        onGithubClick={handleGithubLogin}
        onGoogeClick={handleGoogleLogin}
      />
    </AccountLayout>
  );
};

export default Login;
