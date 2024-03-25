// Esempio di implementazione dei metodi per effettuare richieste HTTP al backend
import axios from "axios";
import { API_ENDPOINT } from "../config";
import { handleError } from "../libs/apiUtils";

export const getAudioList = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/audio/list`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const uploadFile = async (groupName,filePath,file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("groupName", groupName);
  formData.append("filePath", filePath);

  try {
    const response = await axios.post(`${API_ENDPOINT}/audio/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
