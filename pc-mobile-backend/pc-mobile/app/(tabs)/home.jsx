import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Avatar, Tab, ListItem, Badge } from "@rneui/base";
import { useGlobalContext } from "../../context/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { user, baseUrl, token } = useGlobalContext();
  const [solicitacoes, setSolicitacoes] = useState([]);

  const fetchSolicitacoes = async () => {
    console.log(token);
    try {
      const response = await axios.get(
        `${baseUrl}/solicitacoes-cliente/minhas`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSolicitacoes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    }
  };

  useEffect(() => {
    if (selectedTab === 1) fetchSolicitacoes();
  }, [selectedTab]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Aceito":
        return "green";
      case "Recusado":
        return "red";
      case "Em Análise":
        return "blue";
      case "Cancelado":
        return "orange";
      default:
        return "#E0E0E0";
    }
  };

  const renderSolicitacoes = () => (
    <ScrollView>
      {solicitacoes.map((sol, i) => (
        <ListItem key={i} bottomDivider containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title>{sol.titulo}</ListItem.Title>
          </ListItem.Content>
          <Badge
            value={sol.status}
            badgeStyle={{
              ...styles.badge,
              backgroundColor: getStatusColor(sol.status),
            }}
            textStyle={styles.badgeText}
          />
        </ListItem>
      ))}
    </ScrollView>
  );

  const renderAtendimentos = () => (
    <ScrollView>
      {[
        {
          name: "John Doe",
          specialty: "Cardiologista",
          avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        },
        {
          name: "Alba King",
          specialty: "Dermatologista",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Adam Eva",
          specialty: "Ortopedista",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        },
      ].map((prof, i) => (
        <ListItem key={i} bottomDivider containerStyle={styles.listItem}>
          <Avatar
            rounded
            source={prof.avatar ? { uri: prof.avatar } : null}
            icon={
              prof.avatar
                ? null
                : { name: "person-outline", type: "material", size: 26 }
            }
            containerStyle={{
              backgroundColor: prof.avatar ? undefined : "#c2c2c2",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{prof.name}</ListItem.Title>
            <ListItem.Subtitle>{prof.specialty}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: user?.avatar || "https://via.placeholder.com/150",
          }}
          containerStyle={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.nome || "Nome"}</Text>
          <Text style={styles.info}>{user?.email || "Email"}</Text>
          <Text style={styles.info}>{user?.objetivo || "Objetivo"}</Text>
        </View>
      </View>

      <Tab
        value={selectedTab}
        onChange={(e) => setSelectedTab(e)}
        indicatorStyle={{ backgroundColor: "#4CCFF9", height: 3 }}
        variant="default"
      >
        <Tab.Item
          title="Atendimentos"
          titleStyle={{ fontSize: 14 }}
          icon={{ name: "work-outline", type: "material", color: "#0095C6" }}
        />
        <Tab.Item
          title="Solicitações"
          titleStyle={{ fontSize: 14 }}
          icon={{ name: "assignment", type: "material", color: "#0095C6" }}
        />
      </Tab>

      {selectedTab === 0 ? renderAtendimentos() : renderSolicitacoes()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4CA0C8",
    paddingVertical: 30,
    paddingHorizontal: 20,
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
  listItem: {
    backgroundColor: "#E0E0E0",
  },
  badge: {
    width: 80,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;
