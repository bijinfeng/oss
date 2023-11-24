import { createBrowserRouter } from "react-router-dom";

import Layout, { layoutLoader } from "./pages/dashboard/layout";
import Home from "./pages/dashboard/home";
import Albums from "./pages/dashboard/albums";
import Upload from "./pages/dashboard/upload";
import Setting from "./pages/dashboard/setting/layout";
import Profile from "./pages/dashboard/setting/profile";
import Appearance from "./pages/dashboard/setting/appearance";
import Beds from "./pages/dashboard/setting/beds";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "albums",
        element: <Albums />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "setting",
        element: <Setting />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "appearance",
            element: <Appearance />,
          },
          {
            path: "beds",
            element: <Beds />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    lazy: () => import("./pages/login"),
  },
  {
    path: "register",
    lazy: () => import("./pages/register"),
  },
  {
    path: "reset-password",
    lazy: () => import("./pages/reset-password"),
  },
  {
    path: "forget-password",
    lazy: () => import("./pages/forget-password"),
  },
]);
