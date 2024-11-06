import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, SearchBar, ListItem } from "@rneui/base";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalContext";
import axios from "axios";

const PesquisaProfissionaisScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const { baseUrl } = useGlobalContext();
  const router = useRouter();
  let searchTimeout;

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(`${baseUrl}/profissionais`);
        setProfessionals(response.data);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
      }
    };
    fetchProfessionals();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const filtered = professionals.filter((professional) =>
        professional.nome.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProfessionals(filtered);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Digite o nome do profissional"
        onChangeText={handleSearch}
        value={searchQuery}
        platform="default"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
      />

      <ScrollView>
        {(filteredProfessionals.length > 0
          ? filteredProfessionals
          : professionals
        ).map((professional) => (
          <ListItem
            key={professional._id}
            bottomDivider
            containerStyle={styles.listItem}
            onPress={() => router.push(`/(search)/${professional._id}`)}
          >
            <Avatar
              rounded
              size="medium"
              icon={{ name: "person", type: "material", color: "#fff" }}
              containerStyle={styles.avatar}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {professional.nome}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {professional.especializacao}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    backgroundColor: "#F5F5F5",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchInput: {
    backgroundColor: "#E0E0E0",
  },
  listItem: {
    backgroundColor: "#E0E0E0",
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  avatar: {
    backgroundColor: "#4CA0C8",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "#777",
  },
});

export default PesquisaProfissionaisScreen;
