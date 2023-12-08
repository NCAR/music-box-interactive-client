export const getMechanism = (store) => store.mechanism;

export const getMechanismAsObject = (store) => ({ mechanism: store.mechanism });

export const getAerosolSpeciesNames = (store) => {
  return store.mechanism.aerosolSpecies.map((species) => species.name);
};

export const getVariableSpeciesNames = (store) => {
  return store.mechanism.gasSpecies
    .filter((species) => {
      return !species.static;
    })
    .map((species) => species.name);
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
  console.log(getMechanism(store))
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

const reactionToLabel = (reaction) => {
  let name = '';
  switch(reaction.type) {
    case "PHOTOLYSIS":
      name = reaction.reactant + "->";
      name += reaction.products.map(item => item.name).join('+');
      break;
    case "EMISSION":
      name = "->" + reaction.species;
      break;
    case "FIRST_ORDER_LOSS":
      name = reaction.species + "->";
      break;
    default:
      name = reaction.reactants.map(item => item.name).join('+') + "->";
      name += reaction.products.map(item => item.name).join('+');
      break;
  }
  return name;
}

export const getUserDefinedRatesIds = (store) => {
  return getMechanism(store)
    .reactions.filter((reaction) => {
      return (
        reaction.isUserDefined
      );
    })
    .map((reaction) => {
      return {
        id: reaction.id,
        name: reaction.data.musica_name || reactionToLabel(reaction.data),
        prefix: reaction.tablePrefix,
      };
    });
};

export const getPossibleUnits = (store, reactionId) => {
  return getMechanism(store)
    .reactions.filter((reaction) => {
      return reaction.data.id === reactionId;
    })
    .map((reaction) => {
      return reaction.possibleUnits;
    })[0];
};
