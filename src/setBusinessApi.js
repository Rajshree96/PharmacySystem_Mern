import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/business-setup';

const addBusinessSetup = async (formData) => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${auth.token}`
    }
  };
  const response = await axios.post(`${API_URL}/add`, formData, config);
  return response.data;
};

export { addBusinessSetup };
