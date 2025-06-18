"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/theme.slice";
import { useEffect } from "react";
import { Switch } from "./ui/switch";

const SwitchTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />;
};

export default SwitchTheme;
