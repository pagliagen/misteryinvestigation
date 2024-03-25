// Esempio di implementazione dei metodi per effettuare richieste HTTP al backend
import axios from "axios";
import { API_ENDPOINT } from "../config";
import { handleError } from "../libs/apiUtils";

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/user/login`,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (email, username, password, isMaster) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/user/register`,
      { email, username, password, isMaster },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/user/reset-password`,
      { email },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePassword = async (token, newPassword) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/user/update-password`,
      { token, newPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
