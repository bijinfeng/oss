import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { router } from "@/router";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const App = () => {

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
