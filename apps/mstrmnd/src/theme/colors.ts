/**
 * MSTRMND palette.
 *
 * The app is dark-only by design — the deliberation room is meant to feel like a
 * situation room, not a document. Values are static (not platform-semantic) so
 * they can be passed straight into Reanimated styles and gradients.
 */
export const colors = {
  // Surfaces, darkest to lightest.
  void: "#07070B",
  surface: "#0E0E15",
  surfaceRaised: "#15151F",
  surfaceOverlay: "#1C1C29",

  // Hairlines and dividers.
  border: "#23233240",
  borderStrong: "#2E2E42",

  // Text.
  label: "#F4F4F8",
  secondaryLabel: "#9B9BB0",
  tertiaryLabel: "#61617A",

  // Brand.
  violet: "#7C5CFF",
  cyan: "#22D3EE",
  amber: "#FFB020",
  rose: "#FF4D7D",
  mint: "#34E0A1",

  // Fixed contrast colors.
  onTint: "#07070B",
  onDark: "#FFFFFF",

  // Status.
  danger: "#FF5C5C",
  success: "#34E0A1",
} as const;

/** Signature gradient — used for the app mark, primary CTAs and the active pill. */
export const brandGradient = [colors.violet, colors.cyan] as const;

/** Translucent tint of a hue, for agent-colored surfaces and glows. */
export function tint(hex: string, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
