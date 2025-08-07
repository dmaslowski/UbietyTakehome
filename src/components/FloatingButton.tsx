import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useTheme } from "../providers/themeContext";
import { Theme } from "@/assets/theme/theme";

type FloatingButtonProps = {
    onPress: () => void;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
    const { theme } = useTheme();
    return (
        <TouchableOpacity
            style={styles(theme).floatingButton}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={{ ...theme.textStyle.bodyBold, color: theme.color.onPrimary }}>↓</Text>
        </TouchableOpacity>
    )
};

export default FloatingButton;

const styles = (theme: Theme) => {
    return StyleSheet.create({
        floatingButton: {
            position: 'absolute',
            bottom: theme.spacing.xl,
            right: theme.spacing.xl,
            width: theme.size.md,
            height: theme.size.md,
            borderRadius: theme.borderRadius.md,
            backgroundColor: theme.color.primary,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.color.shadow,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: theme.borderRadius.sm,
            elevation: 5,
        },
    })
}