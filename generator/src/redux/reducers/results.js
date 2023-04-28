import { RunStatus } from "../../controllers/models";

const initialState = {
  runStatus: RunStatus.DONE
}

export const resultsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

