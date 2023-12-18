export const getConditions = (store, schema) => {
  return store.conditions[schema.classKey];
};

export const getCondition = (store, schema, conditionId) => {
  return store.conditions[schema.classKey].find(
    (condition) => condition.id === conditionId,
  );
};

export const getEvolvingConditions = (store) => store.conditions.evolving;

export const getPossibleConditions = (store) => {
  return [
    ...store.mechanism.gasSpecies.map((species) => {
      return {
        name: species.name + " [mol m-3]",
        tableName: "CONC." + species.name + ".mol m-3",
      };
    }),
    {
      name: "temperature [K]",
      tableName: "ENV.temperature.K",
    },
    {
      name: "pressure [Pa]",
      tableName: "ENV.pressure.Pa",
    },
    ...store.mechanism.reactions
      .filter((reaction) => {
        return reaction.isUserDefined && reaction.data.musica_name.length > 0;
      })
      .map((reaction) => {
        return {
          name:
            reaction.data.musica_name + " [" + reaction.possibleUnits[0] + "]",
          tableName:
            reaction.tablePrefix +
            "." +
            reaction.data.musica_name +
            "." +
            reaction.possibleUnits[0],
        };
      }),
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
