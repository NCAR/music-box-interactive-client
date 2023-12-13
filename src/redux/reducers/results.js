import utils from "../utils";
import { RunStatus } from "../../controllers/models";

const initialState = {
  runStatus: RunStatus.WAITING,
  error: {
    message:
      "Your ship has sunk. If you try to get help from the dolphin, go to page 34.",
  },
  data: {
    times: [ 0.0, 1.5, 3.0, 4.0, 5.0 ],
    temperature: [ 298.0, 298.4, 298.5, 298.3, 298.1 ],
    pressure: [ 101325.0, 101325.3, 101325.5, 101325.7, 101326.0 ],
    species: [
      {
        name: "M",
        concentration: [ 1e6, 1e6, 1e6, 1e6, 1e6 ]
      },
      {
        name: "O",
        concentration: [ 12.5, 3.2, 1.2, 1.1, 0.9 ]
      },
      {
        name: "O1D",
        concentration: [ 1.5, 3.3, 4.3, 5.6, 6.3 ]
      },
      {
        name: "O2",
        concentration: [ 1.1e5, 1.3e5, 1.2e5, 1.25e5, 1.35e5 ]
      },
      {
        name: "O3",
        concentration: [ 1232.1, 1235.5, 1231.3, 1236.12, 1239.4 ]
      },
    ],
    integrated_rates: [
      [ 12.3, 14.5, 15.5, 14.3, 13.2 ],
      [ 23.3, 2.32, 41.3, 16.5, 72.4 ],
      [ 23.4, 93.4, 16.5, 62.4, 17.3 ],
      [ 41.2, 73.4, 5.23, 62.5, 8.23 ],
      [ 2.43, 42.5, 51.3, 12.5, 8.12 ],
      [ 51.3, 72.3, 62.4, 16.4, 1.52 ],
      [ 25.6, 81.2, 3.63, 71.4, 17.3 ]
    ]
  }
};

export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case utils.action_types.RESET_ALL: {
      return {
        ...initialState,
      };
    }
    case utils.action_types.UPDATE_RUN_STATUS: {
      return {
        ...state,
        runStatus: action.payload.content.status,
        error: action.payload.content.error,
      };
    }
    default:
      return state;
  }
};
