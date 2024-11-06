import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";

const AuthLayout = () => {
  const { isLogged, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (isLogged) {
      router.replace("/home");
    }
  }, [isLogged, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default AuthLayout;
