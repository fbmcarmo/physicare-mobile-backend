import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar, Button } from "@rneui/base";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useGlobalContext } from "../../../context/GlobalContext";

const PerfilProfissionalScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [professional, setProfessional] = useState(null);
  const { baseUrl } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await axios.get(`${baseUrl}/profissionais/${id}`);
        setProfessional(response.data);
      } catch (error) {
        console.error("Erro ao buscar profissional:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessional();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CA0C8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded
          size="large"
          source={professional.avatar ? { uri: professional.avatar } : null}
          icon={
            professional.avatar
              ? null
              : { name: "person", type: "material", color: "#fff" }
          }
          containerStyle={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{professional.nome}</Text>
          <Text style={styles.info}>{professional.email}</Text>
          <Text style={styles.info}>{professional.especializacao}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Enviar mensagem"
          buttonStyle={styles.actionButton}
          titleStyle={styles.buttonTitle}
          onPress={() => console.log("Enviar mensagem")}
        />
        <Button
          title="Solicitar Atendimento"
          buttonStyle={styles.actionButton}
          titleStyle={styles.buttonTitle}
          onPress={() => console.log("Solicitar Atendimento")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#4CA0C8",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#4CA0C8",
  },
  userInfo: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  info: {
    color: "#fff",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  actionButton: {
    backgroundColor: "#4CCFF9",
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PerfilProfissionalScreen;
