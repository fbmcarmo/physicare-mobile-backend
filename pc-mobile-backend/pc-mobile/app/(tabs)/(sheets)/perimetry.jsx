import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Avatar, Button, Divider, CheckBox, Input } from "@rneui/base";
import axios from "axios";
import { useGlobalContext } from "../../../context/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";

const formatLabel = (key) => {
  let label = key.replace(/([A-Z])/g, " $1").trim();
  return (
    label.charAt(0).toUpperCase() +
    label.slice(1).replace("Direita", "Direito").replace("Esquerda", "Esquerdo")
  );
};

const formatIndicatorLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("No", "no")
    .replace("De", "de");
};

const PerimetriaScreen = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    altura: "",
    peso: "",
    objetivo: "",
    circunferencias: {
      pescoco: "",
      peitoral: "",
      ombroDireito: "",
      ombroEsquerdo: "",
      bracoDireito: "",
      bracoEsquerdo: "",
      cintura: "",
      abdomen: "",
      quadril: "",
      coxaDireita: "",
      coxaEsquerda: "",
      panturrilhaDireita: "",
      panturrilhaEsquerda: "",
    },
    indicadores: {
      fumante: false,
      diabetes: false,
      lesoes: false,
      dorNoPeito: false,
      perdaDeConsciencia: false,
    },
    observacoes: "",
  });

  const { user, baseUrl, token } = useGlobalContext();

  useEffect(() => {
    const fetchFichaPerimetria = async () => {
      try {
        const response = await axios.get(`${baseUrl}/minha-ficha-perimetria`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;

        const formattedData = {
          ...data,
          altura: data.altura.toString(),
          peso: data.peso.toString(),
          circunferencias: Object.fromEntries(
            Object.entries(data.circunferencias).map(([key, value]) => [
              key,
              value ? value.toString() : "",
            ])
          ),
          indicadores: data.indicadores,
          observacoes: data.observacoes || "",
          objetivo: data.objetivo || "",
        };
        setFormData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar a ficha de perimetria", error);
        Alert.alert("Erro ao buscar a ficha de perimetria");
      }
    };

    fetchFichaPerimetria();
  }, [token]);

  const toggleIndicator = (name) => {
    setFormData({
      ...formData,
      indicadores: {
        ...formData.indicadores,
        [name]: !formData.indicadores[name],
      },
    });
  };

  const saveFicha = async () => {
    try {
      const dataToSend = {
        ...formData,
        altura: parseFloat(formData.altura),
        peso: parseFloat(formData.peso),
        circunferencias: Object.fromEntries(
          Object.entries(formData.circunferencias).map(([key, value]) => [
            key,
            value ? parseFloat(value) : 0,
          ])
        ),
      };

      await axios.put(`${baseUrl}/minha-ficha-perimetria`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Ficha atualizada com sucesso!");
      setIsEditable(false);
    } catch (error) {
      console.error("Erro ao salvar a ficha", error);
      Alert.alert("Erro ao salvar a ficha");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                user?.avatar ||
                "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            containerStyle={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user?.nome || "Nome"}</Text>
            <Text style={styles.info}>{user?.email || "Email"}</Text>
            <Text style={styles.info}>
              Data Avaliação: {formData.dataAvaliacao?.substring(0, 10) || ""}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Meus Dados</Text>
        <Divider style={styles.divider} />
        <Input
          label="Altura"
          placeholder="Digite sua altura"
          keyboardType="numeric"
          disabled={!isEditable}
          value={formData.altura}
          onChangeText={(text) => setFormData({ ...formData, altura: text })}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholderTextColor="#A9A9A9"
        />
        <Input
          label="Peso"
          placeholder="Digite seu peso"
          keyboardType="numeric"
          disabled={!isEditable}
          value={formData.peso}
          onChangeText={(text) => setFormData({ ...formData, peso: text })}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholderTextColor="#A9A9A9"
        />
        <Input
          label="Objetivo"
          placeholder="Qual é o seu objetivo?"
          disabled={!isEditable}
          value={formData.objetivo}
          onChangeText={(text) => setFormData({ ...formData, objetivo: text })}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholderTextColor="#A9A9A9"
        />

        <Text style={styles.sectionTitle}>Circunferências (CM)</Text>
        <Divider style={styles.divider} />
        {Object.keys(formData.circunferencias).map((key, index) => (
          <Input
            key={index}
            label={formatLabel(key)}
            placeholder={`Digite ${formatLabel(key)}`}
            keyboardType="numeric"
            disabled={!isEditable}
            value={formData.circunferencias[key]}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                circunferencias: { ...formData.circunferencias, [key]: text },
              })
            }
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor="#A9A9A9"
          />
        ))}

        <Text style={styles.sectionTitle}>Indicadores</Text>
        <Divider style={styles.divider} />
        {Object.keys(formData.indicadores).map((key, index) => (
          <CheckBox
            key={index}
            title={formatIndicatorLabel(key)}
            checked={formData.indicadores[key]}
            onPress={() => toggleIndicator(key)}
            containerStyle={styles.checkboxContainer}
            disabled={!isEditable}
          />
        ))}

        <Text style={styles.sectionTitle}>Observações</Text>
        <Divider style={styles.divider} />
        <Input
          placeholder="Digite suas observações"
          multiline
          numberOfLines={4}
          disabled={!isEditable}
          value={formData.observacoes}
          onChangeText={(text) =>
            setFormData({ ...formData, observacoes: text })
          }
          containerStyle={styles.textAreaContainer}
          inputStyle={styles.textArea}
          placeholderTextColor="#A9A9A9"
        />

        <Button
          title={isEditable ? "Salvar" : "Editar"}
          buttonStyle={styles.button}
          onPress={() => {
            if (isEditable) {
              saveFicha();
            } else {
              setIsEditable(true);
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: { flex: 1 },
  header: {
    backgroundColor: "#4CA0C8",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: { backgroundColor: "#4CA0C8" },
  userInfo: { marginLeft: 20 },
  name: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  info: { color: "#fff", fontSize: 14 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  divider: {
    width: "95%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "#000",
    marginBottom: 12,
  },
  inputContainer: { flex: 1, marginVertical: 10 },
  input: {
    fontSize: 16,
    padding: 10,
    color: "#333",
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
  },
  checkboxContainer: { backgroundColor: "transparent", borderWidth: 0 },
  textAreaContainer: { marginVertical: 16 },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#F0F0F0",
    textAlignVertical: "top",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CCFF9",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default PerimetriaScreen;
