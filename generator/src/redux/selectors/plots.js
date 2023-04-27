import { getMechanism, getSpeciesNames } from "./mechanism";

export const getPlots = store => store.plots

export const getPlotsByType = (store, plotType) => store.plots[plotType].plots

export const getSpeciesPlots = store => {
  return getSpeciesNames(store).map(name => { return { label: name }});
}

export const getReactionPlots = store => {
  return getMechanism(store).reactions.map((reaction, index) => {
    const strLabel = reaction.shortName() + " (" + reaction.typeLabel + ")";
    return {
      label: strLabel,
      index: index
    }
  })
}

export const getEnvironmentPlots = store => {
  return [
    { label: "temperature" },
    { label: "pressure" }
  ]
}
