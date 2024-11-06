import React from "react";
import { Stack } from "expo-router";

const SearchLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Pesquisa" }} />
      <Stack.Screen name="[id]" options={{ title: "Perfil do Profissional" }} />
    </Stack>
  );
};

export default SearchLayout;
