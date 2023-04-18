const axios = require('axios');

const API_BASE_URL = 'localhost:8000';

async function fetchExample(example) {
  try {
    const params = {
      example: example
    };
    const response = await axios.get(`${API_BASE_URL}/api/load-example`, { params: params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching example ${example}: ${error.message}`);
    throw error;
  }
}

module.exports = { 
  fetchExample 
};
