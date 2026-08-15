import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import type { Agent } from "@/agents/roster";
import { colors, fonts, radius, tint } from "@/theme";

import { ThemedText } from "./themed-text";

const SIZES = { sm: 32, md: 44, lg: 60 } as const;

/**
 * Monogram avatar in the member's accent. When `speaking`, a ring behind it
 * breathes — the room's only ambient motion, so the eye lands on whoever has
 * the floor.
 */
export function AgentAvatar({
  agent,
  size = "md",
  speaking = false,
  dimmed = false,
}: {
  agent: Agent;
  size?: keyof typeof SIZES;
  speaking?: boolean;
  dimmed?: boolean;
}) {
  const dimension = SIZES[size];
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (speaking) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
        -1,
        true,
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(0, { duration: 200 });
    }
    return () => cancelAnimation(pulse);
  }, [speaking, pulse]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.15 + pulse.value * 0.5,
    transform: [{ scale: 1 + pulse.value * 0.22 }],
  }));

  return (
    <View style={{ width: dimension, height: dimension }}>
      {speaking ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.ring,
            {
              borderRadius: dimension / 2,
              borderColor: agent.accent,
            },
            ringStyle,
          ]}
        />
      ) : null}

      <View
        style={[
          styles.body,
          {
            borderRadius: dimension / 2,
            backgroundColor: tint(agent.accent, dimmed ? 0.08 : 0.16),
            borderColor: tint(agent.accent, dimmed ? 0.2 : 0.55),
            opacity: dimmed ? 0.55 : 1,
          },
        ]}
      >
        <ThemedText
          style={{
            fontFamily: fonts.monoMedium,
            fontSize: dimension * 0.3,
            letterSpacing: 0.5,
            color: agent.accent,
          }}
        >
          {agent.monogram}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1.5,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderCurve: "continuous",
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.full,
  },
});
