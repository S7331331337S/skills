/**
 * MSTRMND palette — light editorial.
 *
 * The rule that holds the whole thing together: **the interface is monochrome,
 * and color means something.** Greys carry structure; a hue only appears to
 * identify a board member or report status. Nothing is tinted for decoration.
 *
 * Values are static (not platform-semantic) so they can be passed straight into
 * Reanimated styles and gradients.
 */
export const colors = {
  // Surfaces, ground upward.
  ground: "#F4F5F7", // page behind everything
  surface: "#FFFFFF", // cards, inputs
  surfaceRaised: "#FFFFFF",
  surfaceSunken: "#EDEEF1", // active pill, secondary button, wells

  // Hairlines. Dark at low alpha rather than a grey, so they sit on any surface.
  border: "#11131A0F",
  borderStrong: "#11131A1F",

  // Text.
  ink: "#16171A", // primary text and primary actions
  label: "#16171A",
  secondaryLabel: "#63676E",
  tertiaryLabel: "#9096A0",

  // Member accents. Deepened from the usual bright web palette — a hue that
  // reads well on near-black will vibrate on white.
  violet: "#6D28D9",
  cyan: "#0E7490",
  amber: "#B45309",
  rose: "#E11D48",
  mint: "#047857",
  blue: "#2563EB",
  fuchsia: "#A21CAF",

  // Fixed contrast colors.
  onInk: "#FFFFFF", // text on the ink button
  onTint: "#FFFFFF",

  // Status. The only color allowed to appear without identifying a member.
  danger: "#DC2626",
  success: "#059669",
} as const;

/** Signature gradient — reserved for the brand mark alone, never for chrome. */
export const brandGradient = [colors.violet, colors.cyan] as const;

/** Translucent wash of a hue, for member-colored surfaces and borders. */
export function tint(hex: string, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
