// supplierapi.js

import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/admin';

const config = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));

    return {
        headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
        },
    };
};

export const addSupplier = async (supplierData) => {
    try {
        const response = await axios.post(`${API_URL}/add-supplier`, supplierData, config());
        return response.data;
    } catch (error) {
        console.error('Error adding supplier:', error.response || error.message);
        throw error;
    }
}
