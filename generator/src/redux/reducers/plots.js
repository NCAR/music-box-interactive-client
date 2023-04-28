import utils from "../utils";

const initialState = {
  species: {
    plots: [
      {
        label: "species plot 1",
        id: "CONC.species plot 1"
      },
      {
        label: "species plot 2",
        id: "CONC.species plot 2"
      }
    ]
  },
  reactions: {
    plots: [
      {
        label: "reaction rate plot 1",
        id: "RATE.1"
      },
      {
        label: "reaction rate plot 2",
        id: "RATE.2"
      },
      {
        label: "reaction rate plot 3",
        id: "RATE.2"
      }
    ]
  },
  environment: {
    plots: [
      {
        label: "environmental condition plot 1",
        id: "ENV.environmental condition plot 1"
      }
    ]
  }
}

export const plotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case utils.action_types.ADD_PLOT: {
      const type = action.payload.content.type;
      const plot = action.payload.content.plot;
      return {
        ...state,
        [type]: [
          ...state[type],
          plot
        ]
      }
    }
    case utils.action_types.REMOVE_PLOT: {
      const type = action.payload.content.type;
      const id   = action.payload.content.id;
      return {
        ...state,
        [type]: [
          ...state[type].filter(plot => plot.id !== id)
        ]
      }
    }
    default:
      return state
  }
}
