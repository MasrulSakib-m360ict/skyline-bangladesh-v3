"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/theme.slice";
import { setLoading, useUtils } from "@/redux/slices/utils.slice";
import { ReactNode, useEffect } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { loading } = useAppSelector(useUtils);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        // dispatch(setTheme(JSON.parse(savedTheme)));
        dispatch(setTheme("light"));
      }
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", JSON.stringify("light"));
    }
  }, [theme, loading]);

  return <div className="">{children}</div>;
};

export default ThemeProvider;
