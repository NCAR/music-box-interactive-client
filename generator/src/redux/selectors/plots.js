import { getMechanism, getSpeciesNames } from "./mechanism";

export const getPlots = store => store.plots

export const getPlotsByType = (store, plotType) => store.plots[plotType].plots

export const getSpeciesPlots = store => {
  return getSpeciesNames(store).map(name => { return { label: name, id: `CONC.${name}` }});
}

export const getReactionPlots = store => {
  return getMechanism(store).reactions.map((reaction, index) => {
    const strLabel = reaction.shortName() + " (" + reaction.typeLabel + ")";
    return {
      label: strLabel,
      id: `RATE.${index}`,
      index: index
    }
  })
}

export const getEnvironmentPlots = store => {
  return [
    { label: "temperature", id: "ENV.temperature" },
    { label: "pressure",    id: "ENV.pressure"    }
  ]
}
