import { Theme } from "@/assets/theme/theme";
import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../providers/themeContext";

export enum ButtonStyle {
    PRIMARY = "primary",
    QUIET = "quiet",
}

type ButtonProps = {
    title: string;
    styleType?: ButtonStyle;
    onPress: () => void;
};

type VariantStyles = {
    container: ViewStyle;
    text: TextStyle;
};

const getVariantStyles = (theme: Theme): Record<ButtonStyle, VariantStyles> => ({
    [ButtonStyle.PRIMARY]: {
        container: {
            borderColor: theme.color.text,
            borderWidth: theme.borderWidth.md,
            backgroundColor: theme.color.surface,
        },
        text: {
            ...theme.textStyle.bodyBold,
            color: theme.color.text,
            textAlign: "center",
        },
    },
    [ButtonStyle.QUIET]: {
        container: {
            borderColor: "transparent",
            borderWidth: theme.borderWidth.none,
            backgroundColor: theme.color.background,
        },
        text: {
            ...theme.textStyle.body,
            color: theme.color.text,
            textAlign: "center",
        },
    },
});

const Button: React.FC<ButtonProps> = ({
    title,
    styleType = ButtonStyle.PRIMARY,
    onPress,
}) => {
    const { theme } = useTheme();
    const variantStyles = getVariantStyles(theme);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...variantStyles[styleType].container,
                borderRadius: theme.borderRadius.md,
                margin: theme.spacing.sm,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: theme.spacing.md,
                paddingHorizontal: theme.spacing.lg,
            }}
            activeOpacity={theme.opacity.focused}
            accessibilityRole="button"
            accessibilityLabel={title}
        >
            <Text style={variantStyles[styleType].text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};


export default Button;
