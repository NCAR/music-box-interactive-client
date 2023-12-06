export const getMechanism = (store) => store.mechanism;

export const getMechanismAsObject = (store) => ({ mechanism: store.mechanism });

export const getAerosolSpeciesNames = (store) => {
  return store.mechanism.aerosolSpecies.map((species) => species.name);
};

export const getSpeciesNames = (store) => {
  return store.mechanism.gasSpecies.map((species) => species.name);
};

export const getSpeciesTolerance = (store, speciesName) => {
  const species = store.mechanism.gasSpecies.filter(
    (species) => species.name === speciesName,
  )[0];
  const tol = species.properties.filter(
    (prop) => prop.name === "absolute convergence tolerance [mol mol-1]",
  );
  return tol.length > 0 ? tol[0].value : 1.0e-14;
};

export const getAerosolProperty = (store, speciesName) => {
  const species = getMechanism(store).aerosolSpecies.filter((species) => {
    return species.name === speciesName;
  });
  return { properties: species.length > 0 ? species[0].properties : [] };
};

export const getProperty = (store, speciesName) => {
  const species = getMechanism(store).gasSpecies.filter((species) => {
    return species.name === speciesName;
  });
  return { properties: species.length > 0 ? species[0].properties : [] };
};

export const getReaction = (store, reactionId) => {
  const reaction = getMechanism(store).reactions.filter((reaction) => {
    return reaction.id === reactionId;
  });
  return reaction[0];
};

export const getReactants = (store, reactionId) => {
  const reaction = getMechanism(store).reactions.filter((reaction) => {
    return reaction.id === reactionId;
  });
  return reaction[0].data.reactants;
};

export const getProducts = (store, reactionId, schema) => {
  const reaction = getMechanism(store).reactions.filter((reaction) => {
    return reaction.id === reactionId;
  });
  return reaction[0].data[schema.key];
};

export const getUserDefinedRates = (store) => {
  return getMechanism(store)
    .reactions.filter((reaction) => {
      return (
        reaction.isUserDefined &&
        reaction.data.musica_name &&
        reaction.data.musica_name.length
      );
    })
    .map((reaction) => {
      return {
        name: reaction.data.musica_name,
        prefix: reaction.tablePrefix,
      };
    });
};

export const getPossibleUnits = (store, musicaName) => {
  return getMechanism(store)
    .reactions.filter((reaction) => {
      return reaction.data.musica_name === musicaName;
    })
    .map((reaction) => {
      return reaction.possibleUnits;
    })[0];
};
