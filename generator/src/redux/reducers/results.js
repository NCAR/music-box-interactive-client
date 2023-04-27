import utils from "../utils";
import { RunStatus } from "../../controllers/models";

const initialState = {
  runStatus: RunStatus.UNKNOWN
}

export const resultsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

