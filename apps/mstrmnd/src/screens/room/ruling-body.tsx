import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { colors, radius, spacing, tint } from "@/theme";

const HEADINGS = ["THE CALL", "WHY", "THE REAL DISAGREEMENT", "DO THIS WEEK"] as const;

type Section = { heading: string; body: string };

/**
 * The chair is prompted to answer in four labelled sections. Parse them so the
 * call reads as a verdict rather than another paragraph — and fall back to plain
 * text whenever the model doesn't follow the format, which it sometimes won't.
 */
export function RulingBody({ text }: { text: string }) {
  const sections = parseSections(text);

  if (!sections.length) {
    return (
      <ThemedText variant="body" style={{ color: colors.label }}>
        {text}
      </ThemedText>
    );
  }

  return (
    <View style={styles.root}>
      {sections.map((section, index) => {
        const isCall = index === 0;
        return (
          <View key={section.heading} style={isCall ? styles.callBlock : styles.block}>
            <ThemedText
              variant="overline"
              style={{ color: isCall ? colors.violet : colors.tertiaryLabel }}
            >
              {section.heading}
            </ThemedText>
            <ThemedText
              variant={isCall ? "title" : "body"}
              style={isCall ? styles.callText : styles.bodyText}
            >
              {section.body}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

function parseSections(text: string): Section[] {
  const found: { heading: string; start: number; end: number }[] = [];

  for (const heading of HEADINGS) {
    // Match the heading only on its own line, so a mention inside prose is ignored.
    const match = new RegExp(`^\\s*#{0,3}\\s*\\*{0,2}${heading}\\*{0,2}\\s*:?\\s*$`, "im").exec(
      text,
    );
    if (match?.index !== undefined) {
      found.push({
        heading,
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }

  if (found.length < 2) return [];

  found.sort((a, b) => a.start - b.start);

  return found
    .map((entry, index) => ({
      heading: entry.heading,
      body: text
        .slice(entry.end, found[index + 1]?.start ?? text.length)
        .trim(),
    }))
    .filter((section) => section.body.length > 0);
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.lg,
  },
  block: {
    gap: spacing.sm,
  },
  callBlock: {
    gap: spacing.sm,
    backgroundColor: tint(colors.violet, 0.07),
    borderRadius: radius.md,
    borderCurve: "continuous",
    borderLeftWidth: 2,
    borderLeftColor: colors.violet,
    padding: spacing.lg,
  },
  callText: {
    color: colors.label,
  },
  bodyText: {
    color: colors.secondaryLabel,
  },
});
