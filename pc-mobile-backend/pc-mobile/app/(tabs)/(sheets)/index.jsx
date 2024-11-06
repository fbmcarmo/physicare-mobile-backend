import React from "react";
import { Text, StyleSheet } from "react-native";
import { Button, Divider } from "@rneui/base";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const FichasScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Suas Fichas</Text>

      <Button
        title="Perimetria"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={() => router.push("/(tabs)/(sheets)/perimetry")}
      />

      <Divider style={styles.divider} />

      <Button
        title="Exercícios"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={() => router.push("/(tabs)/(sheets)/exercises")}
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#4CCFF9",
    width: 200,
    padding: 15,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
  },
});

export default FichasScreen;
