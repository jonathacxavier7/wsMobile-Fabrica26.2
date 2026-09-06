import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, STATUS_COLORS, type SubjectStatus } from "@/constants/colors";

export interface Subject {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  coverUrl: string;
  status: SubjectStatus;
  progress?: number;
  grade?: number;
}

interface SubjectCardProps {
  subject: Subject;
  onPress: (id: string) => void;
}

const STATUS_LABELS: Record<SubjectStatus, string> = {
  active: "Ativa",
  pending: "Pendente",
  inactive: "Inativa",
};

export function SubjectCard({ subject, onPress }: SubjectCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(subject.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image
        source={{ uri: subject.coverUrl }}
        style={styles.cover}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text numberOfLines={2} style={styles.title}>
            {subject.title}
          </Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: STATUS_COLORS[subject.status] },
            ]}
          >
            <Text style={styles.badgeText}>{STATUS_LABELS[subject.status]}</Text>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {subject.shortDescription}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.82,
  },
  cover: {
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.border,
    width: "100%",
  },
  content: {
    gap: 10,
    padding: 14,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.text,
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
