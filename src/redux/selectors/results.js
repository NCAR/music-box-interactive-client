export const getRunStatus = (store) => store.results.runStatus;

export const getLastError = (store) => store.results.error;

export const getResultTimes = (store) => store.results.data.times;

export const getResultTemperatures = (store) => store.results.data.temperatures;

export const getResultPressures = (store) => store.results.data.pressures;

export const getResultSpeciesConcentration = (store, speciesName) =>
  store.results.data.species.filter((species) => {
    return species.name === speciesName;
  })[0]?.concentration;

export const getResultIntegratedReactionRate = (store, reactionIndex) =>
  store.results.data.integrated_rates[reactionIndex];

export const getResults = (store) => {
  return {
    species_concentrations: store.results.data.species,
    integrated_reaction_rates: store.results.data.integrated_rates,
  };
};
