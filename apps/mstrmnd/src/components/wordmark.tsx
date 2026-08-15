import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { brandGradient, colors, fonts } from "@/theme";

import { ThemedText } from "./themed-text";

/** MSTRMND set in the display face with the brand gradient poured through it. */
export function Wordmark({ size = 28 }: { size?: number }) {
  const label = (
    <ThemedText
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        letterSpacing: size * 0.12,
        color: colors.label,
      }}
    >
      MSTRMND
    </ThemedText>
  );

  return (
    <MaskedView
      style={{ height: size * 1.35 }}
      maskElement={<View style={styles.mask}>{label}</View>}
    >
      <LinearGradient
        colors={[...brandGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.fill}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  fill: {
    flex: 1,
  },
});
