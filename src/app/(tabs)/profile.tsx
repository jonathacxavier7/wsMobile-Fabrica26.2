import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api, deleteToken } from "@/constants/api";
import { COLORS } from "@/constants/colors";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const initials = useMemo(() => {
    const words = (user?.name ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return "";
  }, [user?.name]);

  const formattedRole = useMemo(() => {
    const role = user?.role?.toLowerCase();

    if (role === "student" || role === "aluno") {
      return "Aluno";
    }

    if (role === "teacher" || role === "professor") {
      return "Professor";
    }

    return user?.role ?? "Usuário";
  }, [user?.role]);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get<User>("/auth/me");

      setUser(data);
    } catch {
      Alert.alert("Erro", "Nao foi possivel carregar o perfil.");
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleLogout() {
    await deleteToken();
    router.replace("/");
  }

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Perfil</Text>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator color={COLORS.primary} />
          </View>
        ) : (
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials || "US"}</Text>
            </View>

            <Text style={styles.name}>{user?.name ?? "Usuario"}</Text>

            <Text style={styles.email}>
              {user?.email ?? "aluno@unipe.com.br"}
            </Text>

            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{formattedRole}</Text>
            </View>
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutPressed,
          ]}
        >
          <Feather name="log-out" size={18} color={COLORS.white} />

          <Text style={styles.logoutText}>Sair da Conta</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },

  screenTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  profileHeader: {
    alignItems: "center",
    gap: 10,
  },

  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

  avatar: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 48,
    height: 96,
    justifyContent: "center",
    width: 96,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "800",
  },

  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
    textAlign: "center",
  },

  email: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: "center",
  },

  roleBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 999,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  roleText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  logoutButton: {
    alignItems: "center",
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 54,
  },

  logoutPressed: {
    opacity: 0.82,
  },

  logoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
});