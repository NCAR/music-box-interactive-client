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

async function run(config) {
  try {
    await axios.post(`${process.env.GATSBY_API_URL}/api/run`, { ...config });
  } catch (error) {
    console.error(`Error calling run: ${error.message}`);
    throw error;
  }
}

async function checkRunStatus() {
  try {
    const response = await axios.get(`${process.env.GATSBY_API_URL}/api/run-status`);
    return response;
  } catch (error) {
    console.error(`Error calling run: ${error.message}`);
    throw error;
  }
}

module.exports = { 
  fetchExample,
  run,
  checkRunStatus
};
