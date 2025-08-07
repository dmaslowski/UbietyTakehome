import { Theme } from "./theme";

export const darkTheme: Theme = {
    color: {
        primary: "#0A84FF",
        surface: "#181818",
        background: "#000000",
        text: "#FFFFFF",
        border: "#333333",
        error: "#FF453A",
        shadow: "#111111",
        onPrimary: "#FFFFFF",
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    size: {
        md: 48,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 16,
    },
    borderWidth: {
        none: 0,
        sm: 1,
        md: 2,
    },
    opacity: {
        focused: 0.7,
    },
    textStyle: {
        header: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#FFFFFF",
        },
        subheader: {
            fontSize: 18,
            fontWeight: "600",
            color: "#FFFFFF",
        },
        body: {
            fontSize: 15,
            fontWeight: "normal",
            color: "#FFFFFF",
        },
        bodyBold: {
            fontSize: 15,
            fontWeight: "bold",
            color: "#FFFFFF",
        },
        caption: {
            fontSize: 12,
            fontWeight: "normal",
            color: "#FFFFFF",
        },
        numberInput: {
            fontSize: 48,
            fontWeight: "bold",
            color: "#FFFFFF",
        },
    },
};