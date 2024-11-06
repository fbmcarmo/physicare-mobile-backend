import React, { useEffect } from "react";
import { Text, Image, StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalContext";

const Onboarding = () => {
  const router = useRouter();
  const { isLogged, loading } = useGlobalContext();

  useEffect(() => {
    if (loading) return;

    if (isLogged) {
      router.replace("/home");
    }
  }, [isLogged, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/300x150.png?text=Logo" }}
        style={styles.logo}
      />
      <Text style={styles.text}>Um texto qualquer</Text>
      <Button
        title="Login"
        buttonStyle={styles.loginButton}
        onPress={() => router.push("/(auth)/sign-in")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 20,
    backgroundColor: "#4CA0C8",
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#4CCFF9",
    width: 200,
    padding: 10,
    borderRadius: 5,
  },
});

export default Onboarding;
