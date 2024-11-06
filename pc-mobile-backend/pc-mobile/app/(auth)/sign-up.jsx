import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Input, Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";
import axios from "axios";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { baseUrl } = useGlobalContext();
  const router = useRouter();

  const convertDateToISO = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const onDateChange = (event, date) => {
    const currentDate = date || selectedDate;
    setShowDatePicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
    setBirthDate(
      `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`
    );
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setModalVisible(false);
  };

  const handleSignUp = async () => {
    const formattedBirthDate = convertDateToISO(birthDate);
    const userData = {
      nome: name,
      dataNascimento: formattedBirthDate,
      email,
      senha: password,
      genero: gender.toLowerCase(),
    };

    console.log(userData);
    try {
      const response = await axios.post(`${baseUrl}/signup-cliente`, userData);

      if (response.status === 201) {
        Alert.alert("Sucesso", response.data.mensagem);
        router.replace("/(auth)/sign-in");
      } else {
        Alert.alert(
          "Erro",
          response.data.mensagem || "Erro ao cadastrar, tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      Alert.alert("Erro", "Erro ao conectar ao servidor");
    }
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/300x150.png?text=Logo" }}
        style={styles.logo}
      />

      <Input
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="person" type="material" color="#0095C6" />}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Input
          placeholder="Data de Nascimento"
          value={birthDate}
          editable={false}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          leftIcon={
            <Icon name="calendar-today" type="material" color="#0095C6" />
          }
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          placeholder="Gênero"
          value={gender}
          editable={false}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          leftIcon={<Icon name="face" type="material" color="#0095C6" />}
        />
      </TouchableOpacity>

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
        title="Cadastrar"
        buttonStyle={styles.registerButton}
        onPress={handleSignUp}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Gênero</Text>
            <TouchableOpacity onPress={() => handleGenderSelect("Masculino")}>
              <Text style={styles.modalOption}>Masculino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGenderSelect("Feminino")}>
              <Text style={styles.modalOption}>Feminino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGenderSelect("Outros")}>
              <Text style={styles.modalOption}>Outros</Text>
            </TouchableOpacity>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  registerButton: {
    backgroundColor: "#4CCFF9",
    width: 200,
    padding: 10,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default SignUpScreen;
