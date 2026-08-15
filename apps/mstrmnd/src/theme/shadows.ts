/**
 * On a light ground, shadow is how a surface separates from the page — so it has
 * to stay soft. Anything heavier than this reads as a dropped box rather than a
 * raised card.
 */
export const shadows = {
  card: "0 1px 2px rgba(17, 19, 26, 0.04), 0 1px 1px rgba(17, 19, 26, 0.03)",
  raised: "0 4px 16px rgba(17, 19, 26, 0.08), 0 1px 2px rgba(17, 19, 26, 0.04)",
  overlay: "0 12px 32px rgba(17, 19, 26, 0.12), 0 2px 6px rgba(17, 19, 26, 0.05)",
} as const;

/** Colored halo behind a member's avatar while they hold the floor. */
export function glow(hex: string, strength = 0.28): string {
  return `0 0 20px ${hex}${Math.round(strength * 255)
    .toString(16)
    .padStart(2, "0")}`;
}
