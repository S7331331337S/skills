export const shadows = {
  card: "0 2px 10px rgba(0, 0, 0, 0.40)",
  raised: "0 8px 24px rgba(0, 0, 0, 0.55)",
  overlay: "0 16px 48px rgba(0, 0, 0, 0.65)",
} as const;

/** Colored glow behind an active agent's avatar or a primary CTA. */
export function glow(hex: string, strength = 0.5): string {
  return `0 0 24px ${hex}${Math.round(strength * 255)
    .toString(16)
    .padStart(2, "0")}`;
}
