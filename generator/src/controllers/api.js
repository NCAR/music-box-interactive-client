const axios = require('axios');
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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

async function getPlot(plot) {
  try {
    const params = {
      type: plot.id,
      unit: plot.unit && plot.unit.length ? plot.unit : "n/a"
    }
    console.log("sending", params);
    const response = await axios.get(`${process.env.GATSBY_API_URL}/plots/api/plots/get/`, {
      params: params
    });
    return response;
  } catch (error) {
    console.error(`Error getting plot ${plot}: ${error.message}`);
    throw error;
  }
}

module.exports = {
  fetchExample,
  run,
  checkRunStatus,
  getPlot
};
