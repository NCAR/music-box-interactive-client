import reactionTypes from '../redux/reducers/reaction_types'
import { ReactionTypes } from './models'

function translate_from_camp_config(config) {
  let id = 0;
  const parseReactants = (reaction) => Object.entries(reaction.reactants).map(([name, props]) => ({name: name, qty: props.qty || 1}));
  const parseProducts = (reaction) => Object.entries(reaction.products).map(([name, props]) => ({name: name, yield: props.yield || 1}));
  const parseAlkoxyProducts = (products) => Object.entries(products).map(([name, props]) => ({name: name, yield: props.yield || 1}));
  const parseNitrateProducts = parseAlkoxyProducts;

  const reactions = config['reactions'].map(reaction => {
    switch (reaction.type) {
      case ReactionTypes.ARRHENIUS: {
        return {
          ...reactionTypes.arrhenius,
          id: id++,
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
          ...reactionTypes.photolysis,
          id: id++,
          data: {
            ...reactionTypes.photolysis.data,
            reactant: parseReactants(reaction)[0].name,
            products: parseProducts(reaction),
            scaling_factor: reaction['scaling factor'] || 1.0
          }
        }
      }
      case ReactionTypes.EMISSION: {
        return {
          ...reactionTypes.emission,
          id: id++,
          data: {
            ...reactionTypes.emission.data,
            scaling_factor: reaction['scaling factor'] || 1.0,
            species: {name: reaction['species'], qty: 1},
            musica_name: reaction['MUSICA name'] || ''
          }
        }
      }
      case ReactionTypes.FIRST_ORDER_LOSS: {
        console.log(reaction)
        return {
          ...reactionTypes.firstOrderLoss,
          id: id++,
          data: {
            ...reactionTypes.firstOrderLoss.data,
            species: reaction['species'],
            scaling_factor: reaction['scaling factor'] || 1.0
          }
        }
      }
      case ReactionTypes.TERNARY_CHEMICAL_ACTIVATION: {
        return {
          ...reactionTypes.ternaryChemicalActivation,
          id: id++,
          data: {
            ...reactionTypes.ternaryChemicalActivation.data,
            k0_A: reaction['k0_A'] || 1.0,
            k0_B: reaction['k0_B'] || 0.0,
            k0_C: reaction['k0_C'] || 0.0,
            kinf_A: reaction['kinf_A'] || 1.0,
            kinf_B: reaction['kinf_B'] || 0.0,
            kinf_C: reaction['kinf_C'] || 0.0,
            Fc: reaction['Fc'] || 0.6,
            N: reaction['N:'] || 1.0,
            reactants: parseReactants(reaction),
            products: parseProducts(reaction)
          }
        }
      }
      case ReactionTypes.TROE: {
        return {
          ...reactionTypes.troe,
          id: id++,
          data: {
            ...reactionTypes.troe.data,
            k0_A: reaction['k0_A'] || 1.0,
            k0_B: reaction['k0_B'] || 0.0,
            k0_C: reaction['k0_C'] || 0.0,
            kinf_A: reaction['kinf_A'] || 1.0,
            kinf_B: reaction['kinf_B'] || 0.0,
            kinf_C: reaction['kinf_C'] || 0.0,
            Fc: reaction['Fc'] || 0.6,
            N: reaction['N:'] || 1.0,
            products: parseProducts(reaction),
            reactants: parseReactants(reaction)
          }
        }
      }
      case ReactionTypes.WENNBERG_NO_RO2: {
        return {
          ...reactionTypes.branched,
          id: id++,
          data: {
              ...reactionTypes.branched.data,
              X: reaction['X:'] || 1.0,
              Y: reaction['Y:'] || 0.0,
              a0: reaction['a0'] || 1.0,
              n: reaction['n:'] || 0,
              reactants: parseReactants(reaction),
              primary_products: parseAlkoxyProducts(reaction['alkoxy products']),
              secondary_products: parseNitrateProducts(reaction['nitrate products'])
          },
        }
      }
      case ReactionTypes.WENNBERG_TUNNELING: {
        return {
          ...reactionTypes.tunneling,
          id: id++,
          data: {
              ...reactionTypes.tunneling,
              A: reaction['A:'] || 1.0,
              B: reaction['B:'] || 0.0,
              C: reaction['C:'] || 0.0,
              reactants: parseReactants(reaction),
              products: parseProducts(reaction)
          },
        }
      }
      default:
        console.error(`Unknown reaction type: ${reaction.type}`);
        return {id: id++, shortName() {return ""}}
    }
  })
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