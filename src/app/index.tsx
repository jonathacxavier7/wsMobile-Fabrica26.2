import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api, setToken } from "@/constants/api";
import { COLORS } from "@/constants/colors";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      Alert.alert(
        "Campos obrigatórios",
        "Informe e-mail e senha para entrar.",
      );
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailIsValid) {
      Alert.alert(
        "E-mail inválido",
        "Informe um endereço de e-mail válido.",
      );
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post<{ accessToken: string }>(
        "/auth/login",
        {
          email: normalizedEmail,
          password: normalizedPassword,
        },
      );

      await setToken(data.accessToken);

      router.replace("/(tabs)/subjects");
    } catch (error: any) {
      const message =
        error.response?.status === 401
          ? "E-mail ou senha incorretos."
          : "Nao foi possivel entrar. Tente novamente.";

      Alert.alert("Falha no login", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: "padding",
          default: undefined,
        })}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.subtitle}>
            Acesse suas materias e acompanhe seu progresso.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>E-mail</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={COLORS.gray}
              style={styles.input}
              value={email}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Senha</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setPassword}
              placeholder="Sua senha"
              placeholderTextColor={COLORS.gray}
              secureTextEntry
              style={styles.input}
              value={password}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Entrar"
            disabled={loading}
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    gap: 8,
    marginBottom: 32,
  },

  title: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },

  form: {
    gap: 18,
  },

  field: {
    gap: 8,
  },

  label: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },

  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.text,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
  },

  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 6,
    minHeight: 54,
  },

  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
});