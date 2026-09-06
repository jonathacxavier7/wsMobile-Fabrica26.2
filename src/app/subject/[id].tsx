import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { type Subject } from "@/components/SubjectCard";
import { COLORS, STATUS_COLORS, type SubjectStatus } from "@/constants/colors";

const SUBJECTS: Subject[] = [
  {
    id: "matematica-aplicada",
    title: "Matematica Aplicada",
    shortDescription: "Funcoes, matrizes e problemas quantitativos.",
    description:
      "Estudo de conceitos matematicos aplicados a situacoes praticas, com foco em raciocinio logico, modelagem e resolucao de problemas.",
    coverUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200",
    status: "active",
    progress: 68,
    grade: 8.7,
  },
  {
    id: "programacao-mobile",
    title: "Programacao Mobile",
    shortDescription: "Interfaces nativas, navegacao e consumo de APIs.",
    description:
      "Disciplina voltada ao desenvolvimento de aplicativos com React Native, Expo Router, componentes reutilizaveis e integracao com servicos externos.",
    coverUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    status: "pending",
    progress: 34,
    grade: 7.4,
  },
  {
    id: "banco-de-dados",
    title: "Banco de Dados",
    shortDescription: "Modelagem, consultas SQL e persistencia de dados.",
    description:
      "Aborda modelagem relacional, normalizacao, consultas SQL e fundamentos de transacoes para aplicacoes modernas.",
    coverUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
    status: "inactive",
    progress: 100,
    grade: 9.1,
  },
];

const STATUS_LABELS: Record<SubjectStatus, string> = {
  active: "Ativa",
  pending: "Pendente",
  inactive: "Inativa",
};

export default function SubjectDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const subject = SUBJECTS.find((item) => item.id === id) ?? SUBJECTS[0];

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: subject.coverUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{subject.title}</Text>
            <View
              style={[
                styles.badge,
                { backgroundColor: STATUS_COLORS[subject.status] },
              ]}
            >
              <Text style={styles.badgeText}>
                {STATUS_LABELS[subject.status]}
              </Text>
            </View>
          </View>

          <View style={styles.metrics}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Progresso</Text>
              <Text style={styles.metricValue}>{subject.progress ?? 0}%</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Nota</Text>
              <Text style={styles.metricValue}>
                {subject.grade?.toFixed(1) ?? "-"}
              </Text>
            </View>
          </View>

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
  content: {
    paddingBottom: 28,
  },
  cover: {
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.border,
    width: "100%",
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
  metrics: {
    flexDirection: "row",
    gap: 12,
  },
  metricBox: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  metricLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
  metricValue: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 6,
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
