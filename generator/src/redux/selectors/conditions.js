export const getConditions = (store, schema) => store.conditions[schema.classKey]

export const getEvolvingConditions = store => store.conditions.evolving

export const getPossibleConditions = store => {
  return [
    ...store.mechanism.gasSpecies.map(species => {
      return {
        name: species.name + " [mol m-3]",
        tableName: "CONC." + species.name + ".mol m-3"
      }
    }),
    {
      name: "temperature [K]",
      tableName: "ENV.temperature.K"
    },
    {
      name: "pressure [Pa]",
      tableName: "ENV.pressure.Pa"
    },
    ...store.mechanism.reactions.filter(reaction => {
      return reaction.isUserDefined && reaction.data.musica_name.length > 0
    }).map(reaction => {
      return {
        name: reaction.data.musica_name + " [" + reaction.possibleUnits[0] + "]",
        tableName: reaction.tablePrefix + "." + reaction.data.musica_name
                   + "." + reaction.possibleUnits[0]
      }
    })
  ]
}

export const getAllConditions = (store) => store.conditions
