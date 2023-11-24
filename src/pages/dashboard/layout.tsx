import { useLoaderData, redirect, Outlet } from "react-router-dom";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCurrentUser } from "@/lib/request";
import { GlobalContext } from "@/lib/global.context";
import { UserInfo } from "@/interface";

export const layoutLoader = async () => {
  try {
    return await getCurrentUser();
  } catch (error) {
    return redirect("/login");
  }
};

export default function Layout() {
  const userInfo = useLoaderData() as UserInfo;

  return (
    <GlobalContext.Provider value={{ userInfo }}>
      <div className="hidden flex-col min-h-screen md:flex">
        <Header />
        <div className="container flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}
