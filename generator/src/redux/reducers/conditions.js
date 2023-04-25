import utils from '../utils';

const initialState = {
    basic: {
        chemistry_time_step: 1.0,
        chemistry_time_step_units: "sec",
        output_time_step: 1.0,
        output_time_step_units: "sec",
        simulation_time: 100.0,
        simulation_time_units: "sec"
    },
    initial_species_concentrations: [ ],
    initial_environmental: [
        {
            id: 0,
            name: "temperature",
            value: 298.15,
            units: "K"
        },
        {
            id: 1,
            name: "pressure",
            value: 101325.0,
            units: "Pa"
        }
    ],
    initial_reactions: [],
    evolving: {
        times: [ 0.0, 1.2, 2.5 ],
        values: [
            {
                name: "foo",
                values: [ 14.3, 62.3, 42.3 ]
            },
            {
                name: "bar",
                values: [ 2.3, 12.4, 55.3 ]
            }
        ]
    }
}

const compareName = (a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
const compareId = (a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0;

export const conditionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case utils.action_types.UPDATE_BASIC_CONFIGURATION: {
            return {
                ...state,
                basic: action.payload.content.data
            }
        }
        case utils.action_types.ADD_CONDITION: {
            const schema = action.payload.content.schema;
            const condition = action.payload.content.condition !== undefined ?
                              action.payload.content.condition :
                              { name: undefined, value: undefined, units: undefined };
            const conditionId = "id" in condition ? condition.id :
                                state[schema.classKey].length > 0 ?
                                Math.max(...state[schema.classKey].map(c => c.id))+1 : 0;
            const otherConditions = state[schema.classKey].filter(condition => {
                return condition.id !== conditionId;
            });
            return {
                ...state,
                [schema.classKey]: [
                    ...otherConditions,
                    {
                        ...condition,
                        id: conditionId
                    }
                ].sort( compareId )
            };
        }
        case utils.action_types.REMOVE_CONDITION: {
            const schema = action.payload.content.schema;
            const id = action.payload.content.conditionId;
            const otherConditions = state[schema.classKey].filter(other => {
                return other.id !== id;
            });
            return {
                ...state,
                [schema.classKey]: [
                    ...otherConditions,
                ].sort( compareId )
            };
        }
        case utils.action_types.UPDATE_EVOLVING_CONDITIONS: {
          return {
                ...state,
                evolving: { ...action.payload.content }
            };
        }
        default:
            return state;
    }
}
