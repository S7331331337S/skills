import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { brandGradient, colors, fonts, radius } from "@/theme";

import { ThemedText } from "./themed-text";

/**
 * Brand lockup: the mark (the board, ringed around the chair) beside the name.
 *
 * The gradient lives here and nowhere else — it's the one piece of color in the
 * app that isn't identifying a member or reporting status.
 */
export function Wordmark({ size = 20 }: { size?: number }) {
  const mark = size * 1.35;

  return (
    <View style={styles.row}>
      <View style={[styles.mark, { width: mark, height: mark, borderRadius: mark / 2 }]}>
        <LinearGradient
          colors={[...brandGradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            styles.chair,
            { width: mark * 0.34, height: mark * 0.34, borderRadius: mark * 0.17 },
          ]}
        />
      </View>

      <ThemedText
        style={{
          fontFamily: fonts.display,
          fontSize: size,
          letterSpacing: size * 0.06,
          color: colors.ink,
        }}
      >
        MSTRMND
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  mark: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderCurve: "continuous",
    borderRadius: radius.full,
  },
  chair: {
    backgroundColor: colors.surface,
  },
});
