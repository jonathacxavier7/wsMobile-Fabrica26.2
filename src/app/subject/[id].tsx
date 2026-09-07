import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { type Subject } from "@/components/SubjectCard";
import { api } from "@/constants/api";
import { COLORS, STATUS_COLORS } from "@/constants/colors";

export default function SubjectDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState<Subject | null>(null);

  const loadSubject = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      setImageError(false);

      const { data } = await api.get<Subject>(`/subjects/${id}`);

      setSubject(data);
    } catch (error: any) {
      const message =
        error.response?.status === 404
          ? "Materia nao encontrada para este usuario."
          : "Nao foi possivel carregar os detalhes da materia.";

      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadSubject();
  }, [loadSubject]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!subject) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.stateText}>Materia indisponivel.</Text>
      </SafeAreaView>
    );
  }

  const hasProgress =
    typeof subject.progress === "number" && !Number.isNaN(subject.progress);

  const hasGrade =
    typeof subject.grade === "number" && !Number.isNaN(subject.grade);

  const progress = hasProgress
    ? Math.min(Math.max(subject.progress ?? 0, 0), 100)
    : 0;

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.coverWrap}>
          {imageError || !subject.coverUrl ? (
            <Image
              source={require("../../assets/placeholder.png")}
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

          {imageLoading && !imageError && (
            <ActivityIndicator
              color={COLORS.primary}
              style={styles.imageLoader}
            />
          )}
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{subject.name}</Text>

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
                STATUS: {subject.status.toUpperCase()}
              </Text>
            </View>
          </View>

          {(hasProgress || hasGrade) && (
            <View style={styles.infoSection}>
              {hasProgress && (
                <View style={styles.infoBlock}>
                  <View style={styles.infoHeader}>
                    <View>
                      <Text style={styles.infoTitle}>Progresso</Text>
                      <Text style={styles.infoHint}>Conclusao da materia</Text>
                    </View>
                    <Text style={styles.infoValue}>{progress}%</Text>
                  </View>

                  <View style={styles.progressBackground}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${progress}%` },
                      ]}
                    />
                  </View>
                </View>
              )}

              {hasProgress && hasGrade && <View style={styles.divider} />}

              {hasGrade && (
                <View style={styles.infoBlock}>
                  <View style={styles.infoHeader}>
                    <View>
                      <Text style={styles.infoTitle}>Nota</Text>
                      <Text style={styles.infoHint}>Desempenho atual</Text>
                    </View>
                    <View style={styles.gradeBadge}>
                      <Text style={styles.gradeValue}>
                        {subject.grade?.toLocaleString("pt-BR", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 2,
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descricao</Text>

            <Text style={styles.description}>{subject.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1,
  },

  center: {
    alignItems: "center",
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
  },

  stateText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },

  content: {
    paddingBottom: 28,
  },

  cover: {
    height: "100%",
    width: "100%",
  },

  coverWrap: {
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.border,
    position: "relative",
    width: "100%",
  },

  imageLoader: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },

  body: {
    gap: 22,
    padding: 20,
  },

  titleRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },

  title: {
    color: COLORS.text,
    flex: 1,
    fontSize: 26,
    fontWeight: "800",
  },

  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  infoSection: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    gap: 18,
    padding: 16,
  },

  divider: {
    backgroundColor: COLORS.border,
    height: 1.5,
    width: "100%",
  },

  infoBlock: {
    gap: 12,
  },

  infoHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },

  infoValue: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
  },

  infoHint: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },

  progressBackground: {
    backgroundColor: COLORS.border,
    borderRadius: 999,
    height: 14,
    overflow: "hidden",
    width: "100%",
  },

  progressFill: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    height: "100%",
  },

  gradeBadge: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    minWidth: 64,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  gradeValue: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },

  section: {
    gap: 8,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
});
