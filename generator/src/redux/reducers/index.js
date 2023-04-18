import { combineReducers } from 'redux';
import utils from '../utils';

const initialState = {
    gasSpecies: []
};

const compareName = (a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

const gasSpeciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case utils.action_types.ADD_GAS_SPECIES: {
            const species = action.payload.content;
            const otherSpecies = state.gasSpecies.filter(other => {
                return other.name !== species.name;
            });
            return species.name === "" ? state : {
                ...state,
                gasSpecies: [
                    ...otherSpecies,
                    species
                ].sort( compareName )
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
            const property = action.payload.content.property;
            const speciesName = action.payload.content.speciesName;
            const species = state.gasSpecies.filter(species => {
                return species.name === speciesName;
            });
            const otherSpecies = state.gasSpecies.filter(species => {
                return species.name !== speciesName;
            });
            const otherProperties = species[0].properties.filter(prop => {
                return prop.name !== property.name;
            });
            return {
                ...state,
                gasSpecies: [
                  ...otherSpecies,
                  {
                      ...species[0],
                      properties: [
                          ...otherProperties,
                          property
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

const loadExampleReducer = (state = initialState, action) => {
    switch(action.type){
        case utils.action_types.EXAMPLE_FETCHED: {
            return {
                gasSpecies: action.payload['species'].map((species) => ({name: species, properties: []}))
            };
        }
        default:
            return state;
    }
}

export default combineReducers({
    gasSpecies: gasSpeciesReducer,
    loadExample: loadExampleReducer
})
