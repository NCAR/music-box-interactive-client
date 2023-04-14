import { combineReducers } from 'redux';
import utils from '../utils';

const initialState = {
    gasSpecies: []
};

const gasSpeciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case utils.action_types.ADD_GAS_SPECIES: {
            const species = action.payload.content.input;
            return {
                ...state,
                gasSpecies: [
                    ...state.gasSpecies,
                    species
                ]
            };
        }
        default:
            return state;
    }
}

export default combineReducers({
    gasSpecies: gasSpeciesReducer
})
