import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login-admin`, { email, password, });

      localStorage.setItem("token", response.data.token);
      Notification.success("Usuário autenticado com sucesso!");

      setTimeout(() => { navigate("/empregadores") }, 2500);

    } catch (err) {
      if (err?.response?.status === 401) {
        Notification.error("Verifique sua senha e tente novamente!");
      }
      else if (err?.response?.status === 404) {
        Notification.error("Verifique seu email e tente novamente!")
      }
      else {
        Notification.error("Erro interno no servidor. Tente novamente mais tarde!");
      }
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;
