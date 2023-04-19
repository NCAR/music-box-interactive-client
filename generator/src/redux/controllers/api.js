const axios = require('axios');

async function fetchExample(example) {
  try {
    const params = {
      example: example
    };
    const response = await axios.get(`${process.env.GATSBY_API_URL}/api/load-example`, { params: params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching example ${example}: ${error.message}`);
    throw error;
  }
}

module.exports = { 
  fetchExample 
};
