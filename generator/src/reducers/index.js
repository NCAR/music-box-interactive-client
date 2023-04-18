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
