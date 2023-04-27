import utils from "../utils";

const initialState = {
  species: {
    plots: [
      {
        label: "species plot 1"
      },
      {
        label: "species plot 2"
      }
    ]
  },
  reactions: {
    plots: [
      {
        label: "reaction rate plot 1"
      },
      {
        label: "reaction rate plot 2"
      },
      {
        label: "reaction rate plot 3"
      }
    ]
  },
  environment: {
    plots: [
      {
        label: "environmental condition plot 1"
      }
    ]
  }
}

export const plotsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
