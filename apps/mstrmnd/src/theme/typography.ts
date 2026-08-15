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
  /** Two-tone masthead heading. Tight tracking is what makes it read as display. */
  hero: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 47,
    letterSpacing: -1.8,
    color: colors.ink,
  },
  largeTitle: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.9,
    color: colors.ink,
  },
  title: {
    fontFamily: fonts.displayMedium,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  headline: {
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.ink,
  },
  subhead: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.secondaryLabel,
  },
  caption: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondaryLabel,
  },
  /** All-caps micro label for section headers and member roles. */
  overline: {
    fontFamily: fonts.monoMedium,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.tertiaryLabel,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.secondaryLabel,
  },
} as const satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;
