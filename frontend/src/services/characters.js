// Esempio di implementazione dei metodi per effettuare richieste HTTP al backend
import axios from "axios";
import { API_ENDPOINT } from "../config";
import { handleError } from "../libs/apiUtils";

export const getCharacterList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINT}/character/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCharacterById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINT}/character/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const UploadAvatar = async (id, avatarFormInfo) => {
  try {
    console.log("*****************", id, avatarFormInfo);
    const formData = new FormData();
    formData.append("avatar", avatarFormInfo);

    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_ENDPOINT}/api/upload/avatar/${id}`,
      {
        formData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createNewCharacter = async (characterInfo) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_ENDPOINT}/character/create`,
      { data: characterInfo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCharacter = async (characterInfo) => {
  try { 
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_ENDPOINT}/character/update`,
      { data: characterInfo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
