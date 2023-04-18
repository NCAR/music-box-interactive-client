export const getGasSpecies = store => store.gasSpecies;

export const getProperty = (store, speciesName) => {
    const species = getGasSpecies(store).gasSpecies.filter(species => {
        return species.name === speciesName;
    });
    return { properties: species[0].properties };
};
