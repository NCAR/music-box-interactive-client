export const getMechanism = store => store.mechanism;

export const getMechanismAsObject = store => ({mechanism: store.mechanism});

export const getProperty = (store, speciesName) => {
    const species = getMechanism(store).gasSpecies.filter(species => {
        return species.name === speciesName;
    });
    return { properties: species.length > 0 ? species[0].properties : [] };
};

export const getReaction = (store, reactionId) => {
    const reaction = getMechanism(store).reactions.filter(reaction => {
        return reaction.id === reactionId;
    });
    return reaction[0];
};
