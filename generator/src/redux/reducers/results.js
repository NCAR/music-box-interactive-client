import utils from '../utils';
import { RunStatus } from "../../controllers/models";

const initialState = {
  runStatus: RunStatus.WAITING,
  error: {
    message: "Your ship has sunk. If you try to get help from the dolphin, go to page 34."
  }
}

export const resultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case utils.action_types.UPDATE_RUN_STATUS: {
            return { ...action.payload.content }
        }
        default:
            return state
    }
}

