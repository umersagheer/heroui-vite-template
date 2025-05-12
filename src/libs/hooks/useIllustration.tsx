import { useTheme } from "@heroui/use-theme";
import { useMemo } from "react";

export function useIllustration(name: string) {
  const { theme } = useTheme();

  // Return memoized path based on current theme and name
  const path = useMemo(() => {
    const safeTheme = theme === "dark" ? "dark" : "light";
    return `/illustrations/${safeTheme}/${name}.png`;
  }, [theme, name]);

  return path;
}
