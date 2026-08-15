import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import type { Agent, AgentId, Preset } from "@/agents/roster";
import { AgentAvatar } from "@/components/agent-avatar";
import { ThemedText } from "@/components/themed-text";
import { colors, radius, spacing, tint } from "@/theme";

/** Preset tables across the top, individual seats below. */
export function SeatPicker({
  agents,
  presets,
  presetId,
  members,
  onPreset,
  onToggle,
}: {
  agents: Agent[];
  presets: Preset[];
  presetId: string;
  members: AgentId[];
  onPreset(id: string): void;
  onToggle(id: AgentId): void;
}) {
  return (
    <View style={styles.root}>
      <View style={styles.section}>
        <ThemedText variant="overline">Tables</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.presets}
        >
          {presets.map((preset) => {
            const active = preset.id === presetId;
            return (
              <Pressable
                key={preset.id}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => onPreset(preset.id)}
                style={({ pressed }) => [
                  styles.preset,
                  active && styles.presetActive,
                  pressed && styles.pressed,
                ]}
              >
                <ThemedText
                  variant="headline"
                  style={{ color: active ? colors.label : colors.secondaryLabel }}
                >
                  {preset.name}
                </ThemedText>
                <ThemedText variant="caption" style={styles.presetHint}>
                  {preset.description}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.seatsHeader}>
          <ThemedText variant="overline">The seats</ThemedText>
          <ThemedText variant="caption" style={{ color: colors.tertiaryLabel }}>
            The Chair always closes
          </ThemedText>
        </View>

        <View style={styles.seats}>
          {agents.map((agent) => {
            const seated = members.includes(agent.id);
            return (
              <Pressable
                key={agent.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: seated }}
                accessibilityLabel={`${agent.name}, ${agent.role}`}
                onPress={() => onToggle(agent.id)}
                style={({ pressed }) => [
                  styles.seat,
                  {
                    borderColor: seated ? tint(agent.accent, 0.5) : colors.border,
                    backgroundColor: seated ? tint(agent.accent, 0.08) : colors.surface,
                  },
                  pressed && styles.pressed,
                ]}
              >
                <AgentAvatar agent={agent} size="sm" dimmed={!seated} />

                <View style={styles.seatText}>
                  <ThemedText
                    variant="headline"
                    numberOfLines={1}
                    style={{ color: seated ? colors.label : colors.secondaryLabel }}
                  >
                    {agent.name}
                  </ThemedText>
                  <ThemedText variant="caption" numberOfLines={2} style={styles.seatTagline}>
                    {agent.tagline}
                  </ThemedText>
                </View>

                {seated ? (
                  <Ionicons name="checkmark-circle" size={18} color={agent.accent} />
                ) : (
                  <Ionicons name="add-circle-outline" size={18} color={colors.tertiaryLabel} />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.xl,
  },
  section: {
    gap: spacing.md,
  },
  presets: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  preset: {
    width: 170,
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
    padding: spacing.lg,
  },
  presetActive: {
    borderColor: tint(colors.violet, 0.6),
    backgroundColor: tint(colors.violet, 0.1),
  },
  presetHint: {
    color: colors.tertiaryLabel,
  },
  seatsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seats: {
    gap: spacing.sm,
  },
  seat: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    borderWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  seatText: {
    flex: 1,
    gap: 2,
  },
  seatTagline: {
    color: colors.tertiaryLabel,
  },
  pressed: {
    opacity: 0.65,
  },
});
