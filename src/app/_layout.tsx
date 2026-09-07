import { Stack, router, usePathname } from "expo-router";
import { useEffect, useState } from "react";

import { getToken } from "@/constants/api";

export default function RootLayout() {
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function protectRoutes() {
      try {
        const token = await getToken();
        const isLogin = pathname === "/";

        if (!token && !isLogin) {
          router.replace("/");
          return;
        }

        if (token && isLogin) {
          router.replace("/(tabs)/subjects");
          return;
        }
      } finally {
        setCheckingAuth(false);
      }
    }

    protectRoutes();
  }, [pathname]);

  if (checkingAuth) {
    return null;
  }

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