import { getProducts, getReactants } from "../selectors";
import utils from "../utils";

const initialState = {
  nodes: [],
  links: [],
  selected_species: [],
  is_log_scale: true,
};

// Redefines the nodes and links that make up the flow diagram based
// on the species selected for inclusion in the flow diagram configuration
const UpdateGraph = (state, dependencies, results) => {
  var rxns = dependencies.filter((reaction) => {
    return (
      [...reaction.reactants, ...reaction.products].filter((species) => {
        return state.selected_species.includes(species.name);
      }).length > 0
    );
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
        className: "reaction",
      };
    }),
    ...Object.values(includedSpecies).map((species, index) => {
      return {
        id: index + rxns.length,
        name: species.name,
        className: species.className,
      };
    }),
  ];
  state.links = rxns.flatMap((reaction, index) => {
    return [
      ...reaction.reactants.map((species) => {
        return {
          source: state.nodes.findIndex((node) => node.name === species.name),
          target: index,
          className: "flux",
          reactionId: reaction.id,
          flux:
            species.coefficient *
            results.integrated_reaction_rates[reaction.id].reduce(
              (total, elem) => total + elem,
              0,
            ),
        };
      }),
      ...reaction.products.map((species) => {
        return {
          source: index,
          target: state.nodes.findIndex((node) => node.name === species.name),
          className: "flux",
          reactionId: reaction.id,
          flux:
            species.yield *
            results.integrated_reaction_rates[reaction.id].reduce(
              (total, elem) => total + elem,
              0,
            ),
        };
      }),
    ];
  });
  return state;
};

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
      const results = action.payload.content.results;
      return UpdateGraph(
        {
          ...state,
          selected_species: [
            ...state.selected_species.filter((elem) => elem !== species),
            species,
          ],
        },
        dependencies,
        results,
      );
    }
    case utils.action_types.DESELECT_FLOW_SPECIES: {
      const species = action.payload.content.species;
      const dependencies = action.payload.content.dependencies;
      const results = action.payload.content.results;
      return UpdateGraph(
        {
          ...state,
          selected_species: state.selected_species.filter(
            (elem) => elem !== species,
          ),
        },
        dependencies,
        results,
      );
    }
    case utils.action_types.SET_IS_FLOW_PLOT_LOG_SCALE: {
      const isLogScale = action.payload.content.isLogScale;
      const dependencies = action.payload.content.dependencies;
      const results = action.payload.content.results;
      return UpdateGraph(
        {
          ...state,
          is_log_scale: isLogScale,
        },
        dependencies,
        results,
      );
    }
    default:
      return state;
  }
};
