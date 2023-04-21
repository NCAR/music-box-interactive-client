import reactionTypes from '../redux/reducers/reaction_types'
import { ReactionTypes } from './models'

function translate_from_camp_config(config) {
  let id = 0;
  const parseReactants = (reaction) => Object.entries(reaction.reactants).map(([name, props]) => ({name: name, qty: props.qty || 1}));
  const parseProducts = (reaction) => Object.entries(reaction.products).map(([name, props]) => ({name: name, yield: props.yield || 1}));

  const reactions = config['reactions'].map(reaction => {
    switch (reaction.type) {
      case ReactionTypes.ARRHENIUS: {
        return {
          id: id++,
          ...reactionTypes.arrhenius,
          data: {
            ...reactionTypes.arrhenius.data,
            A: reaction.A || reactionTypes.arrhenius.data.A,
            Ea: reaction.Ea || reactionTypes.arrhenius.data.Ea,
            B: reaction.B || reactionTypes.arrhenius.data.B,
            D: reaction.D || reactionTypes.arrhenius.data.D,
            E: reaction.E || reactionTypes.arrhenius.data.E,
            products: parseProducts(reaction),
            reactants: parseReactants(reaction)
          }
        }
      }
      case ReactionTypes.PHOTOLYSIS: {
        return {
          id: id++,
          ...reactionTypes.photolysis,
          data: {
            ...reactionTypes.photolysis.data,
            reactant: parseReactants(reaction)[0].name,
            products: parseProducts(reaction)
          }
        }
      }
      case ReactionTypes.EMISSION: {
        return {
          id: id++,
          ...reactionTypes.emission,
        }
      }
      case ReactionTypes.FIRST_ORDER_LOSS: {
        return {
          id: id++,
          ...reactionTypes.firstOrderLoss,
        }
      }
      case ReactionTypes.TERNARY_CHEMICAL_ACTIVATION: {
        return {
          id: id++,
          ...reactionTypes.ternaryChemicalActivation,
        }
      }
      case ReactionTypes.TROE: {
        return {
          id: id++,
          ...reactionTypes.troe,
        }
      }
      case ReactionTypes.WENNBERG_NO_RO2: {
        return {
          id: id++,
          ...reactionTypes.branched,
        }
      }
      case ReactionTypes.WENNBERG_TUNNELING: {
        return {
          id: id++,
          ...reactionTypes.tunneling,
        }
      }
      default:
        console.error(`Unknown reaction type: ${reaction.type}`);
    }
  })
  console.log(reactions)
  return {
    gasSpecies: config['species'].map((species) => ({ name: species, properties: [] })),
    reactions: reactions
  }
}

function translate_to_camp_config(config) {
  return config
}

export {
  translate_from_camp_config,
  translate_to_camp_config,
}