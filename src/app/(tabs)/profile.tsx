import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";

const USER = {
  name: "Ana Beatriz Souza",
  email: "ana.souza@academico.com",
  role: "Aluno",
};

export default function ProfileScreen() {
  const initials = USER.name
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Perfil</Text>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{USER.name}</Text>
          <Text style={styles.email}>{USER.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{USER.role}</Text>
          </View>
        </View>

        <View style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </View>
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
    minHeight: 54,
    justifyContent: "center",
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
});
