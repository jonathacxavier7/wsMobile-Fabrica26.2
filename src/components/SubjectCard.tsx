import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  STATUS_COLORS,
  type SubjectStatus,
} from "@/constants/colors";

export interface Subject {
  id: string;
  name: string;
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

export function SubjectCard({ subject, onPress }: SubjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setImageError(false);
    setImageLoading(true);
  }, [subject.coverUrl]);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(subject.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.coverWrap}>
        {imageError || !subject.coverUrl ? (
          <Image
            source={require("../assets/placeholder.png")}
            style={styles.cover}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: subject.coverUrl }}
            onError={() => setImageError(true)}
            onLoadEnd={() => setImageLoading(false)}
            onLoadStart={() => setImageLoading(true)}
            style={styles.cover}
            resizeMode="cover"
          />
        )}

        {imageLoading && !imageError && !!subject.coverUrl && (
          <ActivityIndicator
            color={COLORS.primary}
            style={styles.imageLoader}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text numberOfLines={2} style={styles.title}>
            {subject.name}
          </Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  STATUS_COLORS[subject.status] ?? COLORS.primary,
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {subject.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {subject.description}
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
    height: "100%",
    width: "100%",
  },

  coverWrap: {
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.border,
    position: "relative",
  },

  imageLoader: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
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