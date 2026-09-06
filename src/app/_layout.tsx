import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="subject/[id]"
        options={{
          headerShown: true,
          headerTitle: "Detalhes da Matéria",
          headerBackTitle: "Voltar",
        }}
      />
    </Stack>
  );
}