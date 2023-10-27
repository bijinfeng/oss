import { useFetcher } from "@remix-run/react";
import { redirect, type ActionFunctionArgs } from "@vercel/remix";

import { LoginForm, type FormValue } from "~/components/login-form";
import { AccountLayout } from "~/components/account-layout";
import { login } from "~/lib/request";
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

const Login = () => {
  const fetcher = useFetcher();

  // 登录成功后导航到首页
  const handleSubmit = async (value: FormValue) => {
    const data = await login(value.email, value.password);
    fetcher.submit({ userId: data.user.id, jwt: data.jwt }, { method: "post" });
  };

  return (
    <AccountLayout
      title="Login to your account"
      flotLink={{ name: "Sign up", link: "/register" }}
    >
      <LoginForm onSubmit={handleSubmit} />
    </AccountLayout>
  );
};

export default Login;
