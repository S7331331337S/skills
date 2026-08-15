import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeInDown, LinearTransition } from "react-native-reanimated";

import { getAgent } from "@/agents/roster";
import { AgentAvatar } from "@/components/agent-avatar";
import { ThemedText } from "@/components/themed-text";
import { ThinkingDots } from "@/components/thinking-dots";
import type { Turn } from "@/lib/types";
import { colors, radius, spacing, tint } from "@/theme";

import { RulingBody } from "./ruling-body";

/** One member's contribution to the transcript. */
export function TurnCard({ turn }: { turn: Turn }) {
  const agent = getAgent(turn.agentId);
  const isRuling = turn.round === "ruling";
  const speaking = turn.status === "speaking" || turn.status === "thinking";

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(18).stiffness(140)}
      layout={LinearTransition.springify().damping(20)}
      style={[
        styles.card,
        {
          borderColor: speaking ? tint(agent.accent, 0.45) : colors.border,
          backgroundColor: isRuling ? tint(colors.violet, 0.07) : colors.surface,
        },
      ]}
    >
      <View style={styles.header}>
        <AgentAvatar agent={agent} size="sm" speaking={speaking} />

        <View style={styles.identity}>
          <ThemedText variant="headline">{agent.name}</ThemedText>
          <ThemedText variant="overline" style={{ color: tint(agent.accent, 0.85) }}>
            {isRuling ? "Ruling" : turn.round === "crossfire" ? "Crossfire" : agent.role}
          </ThemedText>
        </View>

        {turn.status === "thinking" ? <ThinkingDots color={agent.accent} /> : null}
      </View>

      {turn.status === "error" ? (
        <Animated.View entering={FadeIn} style={styles.error}>
          <ThemedText variant="subhead" style={{ color: colors.danger }}>
            {turn.error}
          </ThemedText>
        </Animated.View>
      ) : turn.text ? (
        isRuling ? (
          <RulingBody text={turn.text} />
        ) : (
          <ThemedText variant="body" style={styles.text}>
            {turn.text}
            {turn.status === "speaking" ? (
              <ThemedText style={{ color: agent.accent }}>▍</ThemedText>
            ) : null}
          </ThemedText>
        )
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderCurve: "continuous",
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  identity: {
    flex: 1,
    gap: 3,
  },
  text: {
    color: colors.label,
  },
  error: {
    backgroundColor: tint(colors.danger, 0.1),
    borderRadius: radius.md,
    borderCurve: "continuous",
    padding: spacing.md,
  },
});
