import { useLoaderData, Outlet } from "@remix-run/react";
import {
  json,
  redirect,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@vercel/remix";

import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { api } from "~/lib/appwrite";
import { checkAuthSession } from "~/lib/auth.server";
import { GlobalContext } from "~/lib/global.context";

export const meta: MetaFunction = () => {
  return [
    { title: "OSS Web" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// 获取用户信息，失败重定向到登录页
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await checkAuthSession(request);

  try {
    const userInfo = await api.getAccount();
    return json({ userInfo });
  } catch (error) {
    return redirect("/login");
  }
};

export default function Index() {
  const { userInfo } = useLoaderData<typeof loader>();

  return (
    <GlobalContext.Provider value={{ userInfo }}>
      <div className="hidden flex-col min-h-screen md:flex">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}
