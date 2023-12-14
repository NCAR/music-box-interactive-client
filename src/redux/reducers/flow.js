import { getProducts, getReactants } from "../selectors";
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
  selected_species: [
  ]
}

const UpdateGraph = (state, dependencies) => {
  var rxns = dependencies.filter((reaction) => {
    return [
      ...reaction.reactants,
      ...reaction.products,
    ].filter((species) => {
      return state.selected_species.includes(species.name);
    }).length > 0;
  });
  var includedSpecies = {};
  rxns.forEach((reaction) => {
    reaction.reactants.forEach((species) => {
      includedSpecies[species.name] = {
        name: species.name,
        className: "species",
      };
    });
    reaction.products.forEach((species) => {
      includedSpecies[species.name] = {
        name: species.name,
        className: "species",
      };
    });
  });
  state.nodes = [
    ...rxns.map((reaction, index) => {
      return {
        id: index,
        name: reaction.name,
        className: "reaction"
      };
    }),
    ...Object.values(includedSpecies).map((species, index) => {
      return {
        id: index + rxns.length,
        name: species.name,
        className: species.className,
      };
    })
  ];
  state.links = rxns.flatMap((reaction, index) => {
    return [
      ...reaction.reactants.map((species) => {
        return {
          source: state.nodes.findIndex((node) => node.name === species.name),
          target: index,
          className: "flux"
        }
      }),
      ...reaction.products.map((species) => {
        return {
          source: index,
          target: state.nodes.findIndex((node) => node.name === species.name),
          className: "flux"
        }
      })
    ];
  })
  return state;
}

export const flowReducer = (state = initialState, action) => {
  switch (action.type) {
    case utils.action_types.RESET_ALL: {
      return {
        ...initialState,
      };
    }
    case utils.action_types.SELECT_FLOW_SPECIES: {
      const species = action.payload.content.species;
      const dependencies = action.payload.content.dependencies;
      return UpdateGraph({
        ...state,
        selected_species: [...state.selected_species.filter((elem) => elem !== species), species]
      }, dependencies);
    }
    case utils.action_types.DESELECT_FLOW_SPECIES: {
      const species = action.payload.content.species;
      const dependencies = action.payload.content.dependencies;
      return UpdateGraph({
        ...state,
        selected_species: state.selected_species.filter((elem) => elem !== species)
      }, dependencies);
    }
    default:
      return state;
  }
}