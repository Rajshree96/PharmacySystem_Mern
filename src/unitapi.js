import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/unit"; 

const config = () => {
  // const token = localStorage.getItem("auth");
  const auth = JSON.parse(localStorage.getItem('auth'));

  return {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json'
    },
  };
};

export const addUnit = async (unitData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, unitData, config());
    return response.data;
  } catch (error) {
    console.error('Error adding unit:', error.response || error.message);
    throw error;
  }
};

export const getAllUnits = async () => {
  return axios.get(`${API_URL}/all`, config());
};

export const editUnit = async (id, unitData) => {
    return axios.put(`${API_URL}/edit/${id}`, unitData, config());
  };
  
  export const deleteUnit = async (id) => {
    return axios.delete(`${API_URL}/delete/${id}`, config());
  };

