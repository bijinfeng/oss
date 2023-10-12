import { useLoaderData } from "@remix-run/react";
import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@vercel/remix";
// import { useTranslation } from "react-i18next";

import { Header } from "~/components/header";
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

  const userInfo = await api.getAccount();
  return json({ userInfo });
};

export default function Index() {
  const { userInfo } = useLoaderData<typeof loader>();

  // const { t, i18n } = useTranslation();

  // const changeLanguageHandler = () => {
  //   i18n.changeLanguage("en");
  // };

  return (
    <GlobalContext.Provider value={{ userInfo }}>
      <div className="hidden flex-col md:flex">
        <Header />
      </div>
    </GlobalContext.Provider>
  );
}
