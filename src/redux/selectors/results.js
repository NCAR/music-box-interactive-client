export const getRunStatus = (store) => store.results.runStatus;

export const getLastError = (store) => store.results.error;

export const getTemperatureData = (store) => {
  return store.results.data.times.map((elem, idx) => {
    return {"time": elem, value: store.results.data.temperature[idx]}
  });
}

export const getPressureData = (store) => store.results.data.pressure;