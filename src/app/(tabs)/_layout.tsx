import { Tabs } from "expo-router";
import { type ColorValue, Text } from "react-native";

import { COLORS } from "@/constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="subjects"
        options={{
          title: "Materias",
          tabBarIcon: ({ color }) => (
            <TextIcon color={color} label="M" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <TextIcon color={color} label="P" />
          ),
        }}
      />
    </Tabs>
  );
}

function TextIcon({ color, label }: { color: ColorValue; label: string }) {
  return (
    <Text style={{ color, fontSize: 16, fontWeight: "700" }}>{label}</Text>
  );
}
