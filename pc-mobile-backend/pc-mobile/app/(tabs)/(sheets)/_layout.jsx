import React from "react";
import { Stack } from "expo-router";

const SheetsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Fichas", headerShown: false }}
      />
      <Stack.Screen
        name="perimetry"
        options={{ title: "Ficha de Perimetria", headerShown: false }}
      />
      <Stack.Screen
        name="exercises"
        options={{ title: "Fichas de Exercícios", headerShown: false }}
      />
    </Stack>
  );
};

export default SheetsLayout;
