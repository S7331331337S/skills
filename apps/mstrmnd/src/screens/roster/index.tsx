import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AGENTS, CHAIR, SEATABLE_AGENTS, type Agent } from "@/agents/roster";
import { AgentAvatar } from "@/components/agent-avatar";
import { Screen } from "@/components/screen";
import { ThemedText } from "@/components/themed-text";
import { useHaptics } from "@/hooks/use-haptics";
import { colors, radius, shadows, spacing, tint } from "@/theme";

export function Roster() {
  const insets = useSafeAreaInsets();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.head}>
          <ThemedText variant="largeTitle">The Board</ThemedText>
          <ThemedText variant="subhead">
            {AGENTS.length} members. Each one argues from a single lens, on purpose —
            that&apos;s what makes the room disagree.
          </ThemedText>
        </View>

        {SEATABLE_AGENTS.map((agent) => (
          <MemberCard key={agent.id} agent={agent} />
        ))}

        <ThemedText variant="overline" style={styles.chairLabel}>
          Always seated
        </ThemedText>
        <MemberCard agent={CHAIR} />
      </ScrollView>
    </Screen>
  );
}

function MemberCard({ agent }: { agent: Agent }) {
  const router = useRouter();
  const haptics = useHaptics();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${agent.name}, ${agent.role}`}
      onPress={() => {
        haptics.tap();
        router.push(`/agent/${agent.id}`);
      }}
      style={({ pressed }) => [
        styles.card,
        { borderColor: tint(agent.accent, 0.2) },
        pressed && styles.pressed,
      ]}
    >
      <AgentAvatar agent={agent} size="lg" />

      <View style={styles.body}>
        <ThemedText variant="overline" style={{ color: tint(agent.accent, 0.9) }}>
          {agent.role}
        </ThemedText>
        <ThemedText variant="title">{agent.name}</ThemedText>
        <ThemedText variant="subhead" style={styles.bio}>
          {agent.bio}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  head: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  card: {
    boxShadow: shadows.card,
    flexDirection: "row",
    gap: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    borderWidth: 1,
    padding: spacing.lg,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
  },
  bio: {
    color: colors.tertiaryLabel,
  },
  chairLabel: {
    marginTop: spacing.lg,
  },
  pressed: {
    opacity: 0.7,
  },
});
