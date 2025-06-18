"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster richColors position="top-center" closeButton />
    </Provider>
  );
};

export default ReduxProvider;
