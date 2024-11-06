import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";

export default function TabsLayout() {
  const { isLogged, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isLogged) {
      router.replace("/(auth)/sign-in");
    }
  }, [isLogged, loading]);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Início",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(sheets)"
        options={{
          tabBarLabel: "Fichas",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          tabBarLabel: "Pesquisa",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Conta",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
