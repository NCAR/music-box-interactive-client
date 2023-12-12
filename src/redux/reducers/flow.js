import utils from "../utils"

const initialState = {
  nodes: [
    {
      id: 1,
      name: "A",
      className: "species",
    },
    {
      id: 2,
      name: "B",
      className: "species_primary",
    },
    {
      id: 3,
      name: "C",
      className: "species",
    },
    {
      id: 4,
      name: "D",
      className: "species_primary",
    },
    {
      id: 5,
      name: "E",
      className: "species",
    },
    {
      id: 6,
      name: "F",
      className: "species",
    },
    {
      id: 7,
      name: "G",
      className: "species",
    },
    {
      id: 8,
      name: "H",
      className: "species",
    },
    {
      id: 9,
      name: "I",
      className: "species",
    },
    {
      id: 10,
      name: "J",
      className: "species",
    }
  ],
  links: [
    { source: 1, target: 2, className: "reaction_highlighted" },
    { source: 1, target: 5, className: "reaction_highlighted" },
    { source: 1, target: 6, className: "reaction_highlighted" },
    { source: 2, target: 3, className: "reaction" },
    { source: 2, target: 7, className: "reaction" },
    { source: 3, target: 4, className: "reaction" },
    { source: 8, target: 3, className: "reaction" },
    { source: 4, target: 5, className: "reaction" },
    { source: 4, target: 9, className: "reaction" },
    { source: 5, target: 10, className: "reaction" }
  ],
}

export const flowReducer = (state = initialState, action) => {
  switch (action.type) {
    case utils.action_types.RESET_ALL: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}