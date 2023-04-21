import utils from '../utils';

const initialState = {
    basicConfiguration: {
        chemistry_time_step: 1.0,
        chemistry_time_step_units: "sec",
        output_time_step: 1.0,
        output_time_step_units: "sec",
        simulation_time: 100.0,
        simulation_time_units: "sec"
    }
}

export const conditionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case utils.action_types.UPDATE_BASIC_CONFIGURATION: {
            return {
                ...state,
                basicConfiguration: action.payload.content.data
            }
        }
      default:
          return state;
    }
}
