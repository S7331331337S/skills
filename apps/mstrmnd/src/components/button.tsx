import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useHaptics } from "@/hooks/use-haptics";
import { colors, radius, spacing } from "@/theme";

import { ThemedText } from "./themed-text";

/**
 * Primary is solid ink rather than a gradient: on a light ground, weight reads as
 * emphasis and color reads as meaning. The brand gradient stays on the mark.
 */
const variants = {
  primary: { background: colors.ink, label: colors.onInk, bordered: false },
  secondary: { background: colors.surfaceSunken, label: colors.ink, bordered: false },
  ghost: { background: "transparent", label: colors.secondaryLabel, bordered: true },
  danger: { background: colors.danger, label: colors.onTint, bordered: false },
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

  // A disabled button becomes genuinely inert rather than a faded solid — fading
  // ink to 35% on a light ground just reads as a grey button that should work.
  const background = disabled ? colors.surfaceSunken : v.background;
  const label = disabled ? colors.tertiaryLabel : v.label;

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
          backgroundColor: background,
          opacity: pressed && !isOff ? 0.85 : 1,
          transform: [{ scale: pressed && !isOff ? 0.985 : 1 }],
        },
        v.bordered && styles.bordered,
        style,
      ]}
    >
      <View style={[styles.body, { paddingVertical: s.paddingVertical }]}>
        {loading ? (
          <ActivityIndicator color={label} size="small" />
        ) : (
          <ThemedText variant={s.variant} style={{ color: label }}>
            {title}
          </ThemedText>
        )}
      </View>
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
  bordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
});
