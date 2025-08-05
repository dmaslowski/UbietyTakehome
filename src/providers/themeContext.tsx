import { darkTheme } from "@/assets/theme/darkTheme";
import { lightTheme } from "@/assets/theme/lightTheme";
import { Theme } from "@/assets/theme/theme";
import React, { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext<{ theme: Theme }>({
    theme: lightTheme,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);