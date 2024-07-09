import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/medicine-type';

const getConfig = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  return {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
};

export const getAllMedicineTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/getall`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching medicine types:", error);
    throw error;
  }
};

export const addMedicineType = async (medicineType) => {
  try {
    const response = await axios.post(`${API_URL}/add`, medicineType, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error adding medicine type:", error);
    throw error;
  }
};

export const editMedicineType = async (id, medicineType) => {
  try {
    const response = await axios.put(`${API_URL}/edit/${id}`, medicineType, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error editing medicine type:", error);
    throw error;
  }
};

export const deleteMedicineType = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error deleting medicine type:", error);
    throw error;
  }
};
