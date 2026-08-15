import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/theme";

/**
 * Shared page ground: one flat neutral, deliberately undecorated.
 *
 * The hierarchy comes from white cards lifting off this grey, so any gradient or
 * texture here would compete with the thing it's meant to support.
 */
export function Screen({ children }: { children: ReactNode }) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.ground,
  },
});
