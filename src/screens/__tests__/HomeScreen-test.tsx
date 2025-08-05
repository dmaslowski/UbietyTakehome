import HomeScreen from "@/src/screens/Home/HomeScreen";
import {  render } from "@testing-library/react-native";
import React from "react";

// Mock react-redux
jest.mock("react-redux", () => ({
    useSelector: jest.fn(fn => fn({ customData: { value: "25.00" } })),
    useDispatch: jest.fn(() => jest.fn()),
}));

// Mock RTK Query hook
jest.mock("@/src/services/defaultQuery", () => ({
    useGetDefaultDataQuery: () => ({
        data: { data: "test" },
        error: undefined,
        isLoading: false,
    }),
}));

// Mock theme context if used
jest.mock("@/src/providers/themeContext", () => ({
    useTheme: () => ({
        theme: {
            color: { background: "#fff", error: "#f00", text: "#000" },
            spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
            textStyle: {
                header: { fontSize: 24, fontWeight: "bold", color: "#000" },
                subheader: { fontSize: 20, fontWeight: "600", color: "#000" },
                body: { fontSize: 16, fontWeight: "normal", color: "#000" },
                bodyBold: { fontSize: 16, fontWeight: "bold", color: "#000" },
                caption: { fontSize: 12, fontWeight: "normal", color: "#000" },
                numberInput: { fontSize: 18, fontWeight: "normal", color: "#000" },
            },
            borderRadius: { sm: 4, md: 8, lg: 16 },
            borderWidth: { none: 0, sm: 1, md: 2 },
            opacity: { focused: 0.7 },
        },
    }),
}));

// Mock localization if used
jest.mock("@/src/hooks/useLocalization", () => ({
    useLocalization: () => ({
        translate: (key: string) => key,
    }),
}));

describe("<HomeScreen />", () => {
    test("Text renders correctly on HomeScreen", () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText("HomeScreen.title")).toBeTruthy();
    });
});