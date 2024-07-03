import axios from 'axios';

const API_URL = 'http://localhost:2000/api/v1/business-setup';

const addBusinessSetup = async (data) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await axios.post(`${API_URL}/add`, data, config);
  return response.data;
};

export { addBusinessSetup };
