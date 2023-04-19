import { combineReducers } from 'redux';
import utils from '../utils';

const initialState = {
    gasSpecies: [],
    reactions: []
};

const compareName = (a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

const mechanismReducer = (state = initialState, action) => {
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
                ].sort( compareName )
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
                ].sort( compareName )
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
                ].sort( compareName )
            };
        }
        case utils.action_types.ADD_REACTION: {
            const reaction = action.payload.content;
            const id = "id" in reaction ? reaction.id :
                         state.reactions.length > 0 ?
                         Math.max(...state.reactions.map(r => r.id))+1 : 0;
            const otherReactions = state.reactions.filter(reaction => {
                return reaction.id !== id;
            });
            return {
                ...state,
                reactions: [
                    ...otherReactions,
                    {
                        ...reaction,
                        id: id
                    }
                ]
            };
        }
        case utils.action_types.REMOVE_REACTION: {
          const id = action.payload.content;
          const otherReactions = state.reactions.filter(reaction => {
              return reaction.id !== id;
          });
          return {
              ...state,
              reactions: [
                  ...otherReactions
              ]
          };
        }
        case utils.action_types.EXAMPLE_FETCHED: {
            return {
                gasSpecies: action.payload['species'].map((species) => ({name: species, properties: []})),
                reactions: action.payload['reactions']
            };
        }
        default:
            return state;
    }
}

export default combineReducers({
    mechanism: mechanismReducer
})
