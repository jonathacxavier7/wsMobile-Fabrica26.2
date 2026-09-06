import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SubjectCard, type Subject } from "@/components/SubjectCard";
import { COLORS } from "@/constants/colors";

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

const FILTERS = ["Todas", "Ativas", "Pendentes", "Inativas"];

export default function SubjectsScreen() {
  function handleOpenSubject(id: string) {
    router.push(`/subject/${id}`);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.content}
        data={SUBJECTS}
        initialNumToRender={5}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.greeting}>Ola, Ana</Text>
                <Text style={styles.title}>Suas materias</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/(tabs)/profile")}
                style={styles.profileButton}
              >
                <Text style={styles.profileButtonText}>Perfil</Text>
              </Pressable>
            </View>

            <View style={styles.filters}>
              {FILTERS.map((filter, index) => (
                <View
                  key={filter}
                  style={[styles.chip, index === 0 && styles.chipActive]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      index === 0 && styles.chipTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        }
        maxToRenderPerBatch={10}
        renderItem={({ item }) => (
          <SubjectCard subject={item} onPress={handleOpenSubject} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 28,
  },
  header: {
    gap: 20,
    marginBottom: 20,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },
  profileButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  profileButtonText: {
    color: COLORS.primary,
    fontWeight: "800",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
  chipTextActive: {
    color: COLORS.white,
  },
});
