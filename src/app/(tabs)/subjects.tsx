import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SubjectCard, type Subject } from "@/components/SubjectCard";
import { api } from "@/constants/api";
import { COLORS, type SubjectStatus } from "@/constants/colors";

type Filter = "all" | SubjectStatus;

interface CurrentUser {
  name: string;
  role: string;
}

const ROLE_LABELS: Record<string, string> = {
  student: "Aluno",
  aluno: "Aluno",
  teacher: "Professor",
  professor: "Professor",
};

function getRoleLabel(role?: string) {
  if (!role) {
    return "Usuário";
  }

  return ROLE_LABELS[role.toLowerCase()] ?? role;
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: "Todas", value: "all" },
  { label: "Ativas", value: "active" },
  { label: "Pendentes", value: "pending" },
  { label: "Inativas", value: "inactive" },
];

export default function SubjectsScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const filteredSubjects = useMemo(
    () =>
      filter === "all"
        ? subjects
        : subjects.filter((subject) => subject.status === filter),
    [filter, subjects],
  );

  const loadSubjects = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { data } = await api.get<Subject[]>("/subjects");

      setSubjects(data);
    } catch {
      Alert.alert("Erro", "Nao foi possivel carregar as materias.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadCurrentUser = useCallback(async () => {
    try {
      const { data } = await api.get<CurrentUser>("/auth/me");

      setCurrentUser(data);
    } catch {
      // Se falhar, o cabecalho continua exibindo o texto generico.
    }
  }, []);

  useEffect(() => {
    loadSubjects();
    loadCurrentUser();
  }, [loadSubjects, loadCurrentUser]);

  function handleOpenSubject(id: string) {
    router.push(`/subject/${id}`);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.content}
        data={filteredSubjects}
        initialNumToRender={5}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <View style={styles.headerTexts}>
                <Text numberOfLines={1} style={styles.title}>
                  {currentUser
                    ? `Bem-vindo(a) ${currentUser.name}`
                    : "Bem-vindo(a)"}
                </Text>

                <Text style={styles.greeting}>
                  {currentUser
                    ? `Sua grade curricular • ${getRoleLabel(currentUser.role)}`
                    : "Sua grade curricular"}
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Abrir perfil"
                onPress={() => router.push("/(tabs)/profile")}
                style={({ pressed }) => [
                  styles.profileButton,
                  pressed && styles.profileButtonPressed,
                ]}
              >
                <Text style={styles.profileButtonText}>Perfil</Text>
              </Pressable>
            </View>

            <View style={styles.filters}>
              {FILTERS.map((item) => (
                <Pressable
                  accessibilityRole="button"
                  key={item.value}
                  onPress={() => setFilter(item.value)}
                  style={[
                    styles.chip,
                    filter === item.value && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      filter === item.value && styles.chipTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.stateBox}>
            {loading ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              <Text style={styles.stateText}>
                Nenhuma materia encontrada.
              </Text>
            )}
          </View>
        }
        maxToRenderPerBatch={10}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadSubjects(true)}
            tintColor={COLORS.primary}
          />
        }
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

  headerTexts: {
    flex: 1,
    marginRight: 12,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  greeting: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },

  profileButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  profileButtonPressed: {
    opacity: 0.75,
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

  stateBox: {
    alignItems: "center",
    paddingVertical: 32,
  },

  stateText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
});