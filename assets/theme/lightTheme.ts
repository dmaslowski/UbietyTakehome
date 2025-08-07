import { Theme } from "./theme";

export const lightTheme: Theme = {
    color: {
        primary: "#007AFF",
        surface: "#FFFFFF",
        background: "#F8F8F8",
        text: "#111111",
        border: "#E0E0E0",
        error: "#D32F2F",
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
            color: "#111111",
        },
        subheader: {
            fontSize: 18,
            fontWeight: "600",
            color: "#111111",
        },
        body: {
            fontSize: 15,
            fontWeight: "normal",
            color: "#111111",
        },
        bodyBold: {
            fontSize: 15,
            fontWeight: "bold",
            color: "#111111",
        },
        caption: {
            fontSize: 12,
            fontWeight: "normal",
            color: "#111111",
        },
        numberInput: {
            fontSize: 48,
            fontWeight: "bold",
            color: "#111111",
        },
    },
};
