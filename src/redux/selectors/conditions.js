import { ReactionTypes } from "../../controllers/models";

export const getConditions = (store, schema) => {
  return store.conditions[schema.classKey];
};

export const getCondition = (store, schema, conditionId) => {
  return store.conditions[schema.classKey].find(
    (condition) => condition.id === conditionId,
  );
};

export const getEvolvingConditions = (store) => store.conditions.evolving;

export const getPossibleEvolvingSpeciesConditions = (store) => {
  return store.mechanism.gasSpecies.map((species) => {
    return {
      name: species.name,
      tableName: "CONC." + species.name + ".mol m-3",
    };
  });
};

export const getPossibleEvolvingEnvironmentalConditions = (store) => {
  return [
    {
      name: "temperature",
      tableName: "ENV.temperature.K",
    },
    {
      name: "pressure",
      tableName: "ENV.pressure.Pa",
    },
  ];
};

export const getPossibleEvolvingReactionConditions = (store) => {
  return store.mechanism.reactions
    .filter((reaction) => {
        return reaction.isUserDefined && reaction.data.musica_name.length > 0;
    })
    .reduce((acc, reaction) => {
      let name = `${reaction.tablePrefix}.${reaction.data.musica_name} [${reaction.possibleUnits[0]}]`;
      let tableName = (reaction.tablePrefix === "PHOT" ? "PHOT." : `PHOT.${reaction.tablePrefix}_`) + `${name}.s-1`;

      if (reaction.data.type === "SURFACE") {
        acc.push(
          {
            reactionId: reaction.id,
            suffix: ".number",
            prefix: reaction.tablePrefix,
            tableName: tableName,
          },
          {
            reactionId: reaction.id,
            suffix: ".radius",
            prefix: reaction.tablePrefix,
            tableName: tableName,
          }
        );
      }
      else {
        acc.push({
          reactionId: reaction.id,
          suffix: "",
          prefix: reaction.tablePrefix,
          tableName: tableName,
        });
      }
      return acc;
    }, []);
};

export const getPossibleInitialReactionConditions = (store) => {
  return store.mechanism.reactions
    .filter((reaction) => reaction.isUserDefined)
    .reduce((acc, reaction) => {
      if (reaction.data.type === "SURFACE") {
        acc.push(
          {
            reactionId: reaction.id,
            suffix: ".number",
            possibleUnits: ["m-2"],
          },
          {
            reactionId: reaction.id,
            suffix: ".radius",
            possibleUnits: ["m"],
          }
        );
      }
      else {
        acc.push({
          reactionId: reaction.id,
          suffix: "",
          possibleUnits: reaction.possibleUnits,
        });
      }
      return acc;
    }, []);

};

export const getPossibleEvolvingConditions = (store) => {
  return [
    ...getPossibleEvolvingSpeciesConditions(store),
    ...getPossibleEvolvingEnvironmentalConditions(store),
    ...getPossibleEvolvingReactionConditions(store),
  ];
};

export const getEvolvingTable = (store) => {
  return [
    [
      "time.s",
      ...store.conditions.evolving.values.map((value) => value.tableName),
    ],
    ...store.conditions.evolving.times.map((time, timeIndex) => {
      return [
        time,
        ...store.conditions.evolving.values.map(
          (value) => value.values[timeIndex],
        ),
      ];
    }),
  ];
};

export const getAllConditions = (store) => store.conditions;
