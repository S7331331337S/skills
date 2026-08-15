import type { TextStyle } from "react-native";

import { colors } from "./colors";

/**
 * Weights come from bundled font files, so weight is set via `fontFamily` and
 * `fontWeight` is deliberately omitted — otherwise iOS synthesizes the weight.
 */
export const fonts = {
  display: "SpaceGrotesk_700Bold",
  displayMedium: "SpaceGrotesk_500Medium",
  body: "SpaceGrotesk_400Regular",
  bodyMedium: "SpaceGrotesk_500Medium",
  bodySemibold: "SpaceGrotesk_600SemiBold",
  mono: "JetBrainsMono_400Regular",
  monoMedium: "JetBrainsMono_500Medium",
} as const;

export const type = {
  hero: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1.2,
    color: colors.label,
  },
  largeTitle: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.8,
    color: colors.label,
  },
  title: {
    fontFamily: fonts.displayMedium,
    fontSize: 22,
    lineHeight: 27,
    letterSpacing: -0.4,
    color: colors.label,
  },
  headline: {
    fontFamily: fonts.bodySemibold,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: colors.label,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.label,
  },
  subhead: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondaryLabel,
  },
  caption: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondaryLabel,
  },
  /** All-caps micro label used for section headers and agent roles. */
  overline: {
    fontFamily: fonts.monoMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: colors.tertiaryLabel,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 13,
    lineHeight: 19,
    color: colors.secondaryLabel,
  },
} as const satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;
