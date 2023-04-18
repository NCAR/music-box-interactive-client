import { combineReducers } from 'redux';
import utils from '../utils';

const initialState = {
    gasSpecies: []
};

const gasSpeciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case utils.action_types.ADD_GAS_SPECIES: {
            const species = action.payload.content;
            return {
                ...state,
                gasSpecies: [
                    ...state.gasSpecies,
                    species
                ]
            };
        }
        case utils.action_types.REMOVE_GAS_SPECIES: {
            const speciesName = action.payload.content;
            const newGasSpecies = state.gasSpecies.filter(species => {
                return species.name !== speciesName;
            });
            return {
                ...state,
                gasSpecies: [
                  ...newGasSpecies
                ]
            };
        }
        case utils.action_types.ADD_PROPERTY: {
            const property = action.payload.content;
            const species = state.gasSpecies.filter(species => {
                return species.name === property.speciesName;
            });
            const otherSpecies = state.gasSpecies.filter(species => {
                return species.name !== property.speciesName;
            });
            console.log("species", species);
            console.log("otherSpecies", otherSpecies);
            return {
                ...state,
                gasSpecies: [
                  ...otherSpecies,
                  {
                      ...species[0],
                      properties: [
                          ...species[0].properties,
                          {
                              name: property.name,
                              value: property.value
                          }
                      ]
                  }
                ]
            };
        }
        case utils.action_types.REMOVE_PROPERTY: {
            const removeProperty = action.payload.content;
            const species = state.gasSpecies.filter(species => {
                return species.name === removeProperty.speciesName;
            });
            const properties = species.properties.filter(property => {
                return property.name !== removeProperty.name
            });
            const otherSpecies = state.gasSpecies.filter(species => {
                return species.name !== removeProperty.speciesName;
            });
            return {
                ...state,
                gasSpecies: [
                    ...otherSpecies,
                    {
                        ...species,
                        properties: properties
                    }
                ]
            };
        }
        default:
            return state;
    }
}

const loadConfigReducer = (state = initialState, action) => {
    switch(action.type){
        case utils.action_types.LOAD_CONFIG: {
        }
        default:
            return state;
    }
}

export default combineReducers({
    gasSpecies: gasSpeciesReducer,
    loadConfig: loadConfigReducer
})
