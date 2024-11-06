import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const baseUrl = "http://<IP>:3000";

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const response = await axios.get(`${baseUrl}/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(response.data.user);
          setIsLogged(true);
        }
      } catch (error) {
        console.log("Erro ao inicializar o usuário:", error);
        setUser(null);
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem("token", token);
      setToken(token);
      setUser(userData);
      setIsLogged(true);
    } catch (error) {
      console.log("Erro ao salvar dados de login:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setIsLogged(false);
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        login,
        logout,
        baseUrl,
        token,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
