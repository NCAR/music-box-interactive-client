export const getConditions = (store, schema) => store.conditions[schema.classKey]

export const getEvolvingConditions = store => store.conditions.evolving
