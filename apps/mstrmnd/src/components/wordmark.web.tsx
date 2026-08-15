import { Text } from "react-native";

import { brandGradient, fonts } from "@/theme";

/**
 * Web variant. MaskedView can't mask arbitrary DOM, so the native version
 * renders a flat wordmark here — CSS `background-clip: text` gets the same
 * result natively in the browser.
 */
export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.display,
          fontSize: size,
          lineHeight: size * 1.35,
          letterSpacing: size * 0.12,
        },
        {
          // Horizontal, so the full violet→cyan range lands across the wordmark.
          backgroundImage: `linear-gradient(90deg, ${brandGradient[0]}, ${brandGradient[1]})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        } as never,
      ]}
    >
      MSTRMND
    </Text>
  );
}
