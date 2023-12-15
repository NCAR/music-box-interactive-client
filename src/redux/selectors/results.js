export const getRunStatus = (store) => store.results.runStatus;

export const getLastError = (store) => store.results.error;

export const getPlotDataByType = (store, plot) => {
  if (plot.id.startsWith("CONC.")) {
  }
  else if (plot.id.startsWith("ENV.")){
    let which = plot.id.substring(4)
    switch (which) {
      case 'temperature':
        return {
          data: getTemperatureData(store),
          label: "Temperature",
          units: "K"
        }
      case 'pressure':
        return {
          data: getPressureData(store),
          label: "Pressure",
          units: "Pa"
        }
    }
    console.log("Environment", plot.id.substring(4));
  }
}

export const getTemperatureData = (store) => {
  return store.results.data.times.map((elem, idx) => {
    return {"time": elem, value: store.results.data.temperature[idx]}
  });
}

export const getPressureData = (store) => {
  return store.results.data.times.map((elem, idx) => {
    return {"time": elem, value: store.results.data.pressure[idx]}
  });
}