import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Input, Button, Divider } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";
import axios from "axios";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, baseUrl } = useGlobalContext();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/signin-cliente`, {
        email,
        senha: password,
      });

      if (response.status === 200) {
        const { token, cliente } = response.data;
        await login(token, cliente);
      } else {
        Alert.alert("Erro", "Credenciais inválidas, tente novamente.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      Alert.alert("Erro", "Erro ao conectar ao servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/300x150.png?text=Logo" }}
        style={styles.logo}
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="email" type="material" color="#0095C6" />}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="lock" type="material" color="#0095C6" />}
      />

      <Button
        title="Login"
        buttonStyle={styles.loginButton}
        onPress={handleLogin}
      />

      <Divider style={styles.divider} />

      <Button
        title="Cadastrar"
        type="outline"
        buttonStyle={styles.registerButton}
        titleStyle={styles.registerButtonText}
        onPress={() => router.push("/(auth)/sign-up")}
      />
    </View>
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
    marginBottom: 30,
    backgroundColor: "#4CA0C8",
  },
  inputContainer: {
    width: 300,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#4CCFF9",
    width: 200,
    padding: 10,
    borderRadius: 5,
  },
  divider: {
    width: 150,
    marginVertical: 20,
    backgroundColor: "#333",
  },
  registerButton: {
    backgroundColor: "#F3F3F3",
    width: 200,
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: "#0095C6",
  },
});

export default SignInScreen;
