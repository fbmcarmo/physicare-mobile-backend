import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";

const RequestScreen = () => {
  const [feitoPara, setFeitoPara] = useState("");
  const [titulo, setTitulo] = useState("");
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleRealizarSolicitacao = () => {
    console.log("Feito para:", feitoPara);
    console.log("Título:", titulo);
    console.log("Status:", status);
    console.log("Descrição:", descricao);
  };

  const handleEditarSolicitacao = () => {
    console.log("Teste...");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Solicitação</Text>

        <Input
          label="Feito para"
          placeholder="Digite o destinatário"
          value={feitoPara}
          onChangeText={setFeitoPara}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          // disabled={!isEditable}
        />

        <Input
          label="Título"
          placeholder="Digite o título da solicitação"
          value={titulo}
          onChangeText={setTitulo}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          // disabled={!isEditable}
        />

        <Input
          label="Status da Solicitação"
          placeholder="Digite o status"
          value={status}
          onChangeText={setStatus}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          // disabled={!isEditable}
        />

        <Input
          label="Descrição"
          placeholder="Digite a descrição"
          value={descricao}
          onChangeText={setDescricao}
          containerStyle={styles.inputContainer}
          inputStyle={styles.textArea}
          multiline
          numberOfLines={4}
          // disabled={!isEditable}
        />

        <Button
          title="Realizar Solicitação"
          buttonStyle={styles.buttonPrimary}
          onPress={handleRealizarSolicitacao}
        />

        <Button
          title="Editar Solicitação"
          type="outline"
          buttonStyle={styles.buttonSecondary}
          titleStyle={styles.buttonSecondaryText}
          onPress={handleEditarSolicitacao}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textArea: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  buttonPrimary: {
    backgroundColor: "#4CCFF9",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonSecondary: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonSecondaryText: {
    color: "#0095C6",
  },
});

export default RequestScreen;
