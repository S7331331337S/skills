import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useHaptics } from "@/hooks/use-haptics";
import { brandGradient, colors, radius, spacing } from "@/theme";

import { ThemedText } from "./themed-text";

const variants = {
  primary: { background: "transparent", label: colors.onTint, gradient: true },
  secondary: { background: colors.surfaceOverlay, label: colors.label, gradient: false },
  ghost: { background: "transparent", label: colors.secondaryLabel, gradient: false },
  danger: { background: colors.danger, label: colors.onDark, gradient: false },
} as const;

const sizes = {
  sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, variant: "caption" },
  md: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, variant: "headline" },
  lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, variant: "headline" },
} as const;

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  onPress,
}: {
  title: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  const haptics = useHaptics();
  const v = variants[variant];
  const s = sizes[size];
  const isOff = disabled || loading;

  const body = (
    <View style={[styles.body, { paddingVertical: s.paddingVertical }]}>
      {loading ? (
        <ActivityIndicator color={v.label} size="small" />
      ) : (
        <ThemedText variant={s.variant} style={{ color: v.label }}>
          {title}
        </ThemedText>
      )}
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isOff, busy: loading }}
      disabled={isOff}
      onPress={() => {
        haptics.tap();
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.base,
        {
          paddingHorizontal: s.paddingHorizontal,
          backgroundColor: v.background,
          opacity: isOff ? 0.4 : pressed ? 0.82 : 1,
          transform: [{ scale: pressed && !isOff ? 0.98 : 1 }],
        },
        variant === "ghost" && styles.ghost,
        style,
      ]}
    >
      {v.gradient ? (
        <LinearGradient
          colors={[...brandGradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ghost: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
});
