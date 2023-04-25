import { reactionSchema } from '../redux/schemas'
import { ReactionTypes } from './models'

function translate_from_camp_config(config) {
  let id = 0;
  const parseReactants = (reaction) => Object.entries(reaction.reactants).map(([name, props]) => ({ name: name, qty: props.qty || 1 }));
  const parseProducts = (reaction) => Object.entries(reaction.products).map(([name, props]) => ({ name: name, yield: props.yield || 1 }));
  const parseAlkoxyProducts = (products) => Object.entries(products).map(([name, props]) => ({ name: name, yield: props.yield || 1 }));
  const parseNitrateProducts = parseAlkoxyProducts;

  const reactions = config['reactions'].map(reaction => {
    switch (reaction.type) {
      case ReactionTypes.ARRHENIUS: {
        return {
          ...reactionSchema.arrhenius,
          id: id++,
          data: {
            ...reactionSchema.arrhenius.data,
            A: reaction.A || reactionSchema.arrhenius.data.A,
            Ea: reaction.Ea || reactionSchema.arrhenius.data.Ea,
            B: reaction.B || reactionSchema.arrhenius.data.B,
            D: reaction.D || reactionSchema.arrhenius.data.D,
            E: reaction.E || reactionSchema.arrhenius.data.E,
            products: parseProducts(reaction),
            reactants: parseReactants(reaction)
          }
        }
      }
      case ReactionTypes.PHOTOLYSIS: {
        return {
          ...reactionSchema.photolysis,
          id: id++,
          data: {
            ...reactionSchema.photolysis.data,
            reactant: parseReactants(reaction)[0].name,
            products: parseProducts(reaction),
            scaling_factor: reaction['scaling factor'] || 1.0
          }
        }
      }
      case ReactionTypes.EMISSION: {
        return {
          ...reactionSchema.emission,
          id: id++,
          data: {
            ...reactionSchema.emission.data,
            scaling_factor: reaction['scaling factor'] || 1.0,
            species: { name: reaction['species'], qty: 1 },
            musica_name: reaction['MUSICA name'] || ''
          }
        }
      }
      case ReactionTypes.FIRST_ORDER_LOSS: {
        return {
          ...reactionSchema.firstOrderLoss,
          id: id++,
          data: {
            ...reactionSchema.firstOrderLoss.data,
            species: reaction['species'],
            scaling_factor: reaction['scaling factor'] || 1.0,
            musica_name: reaction['MUSICA name']
          }
        }
      }
      case ReactionTypes.TERNARY_CHEMICAL_ACTIVATION: {
        return {
          ...reactionSchema.ternaryChemicalActivation,
          id: id++,
          data: {
            ...reactionSchema.ternaryChemicalActivation.data,
            k0_A: reaction['k0_A'] || 1.0,
            k0_B: reaction['k0_B'] || 0.0,
            k0_C: reaction['k0_C'] || 0.0,
            kinf_A: reaction['kinf_A'] || 1.0,
            kinf_B: reaction['kinf_B'] || 0.0,
            kinf_C: reaction['kinf_C'] || 0.0,
            Fc: reaction['Fc'] || 0.6,
            N: reaction['N'] || 1.0,
            reactants: parseReactants(reaction),
            products: parseProducts(reaction)
          }
        }
      }
      case ReactionTypes.TROE: {
        return {
          ...reactionSchema.troe,
          id: id++,
          data: {
            ...reactionSchema.troe.data,
            k0_A: reaction['k0_A'] || 1.0,
            k0_B: reaction['k0_B'] || 0.0,
            k0_C: reaction['k0_C'] || 0.0,
            kinf_A: reaction['kinf_A'] || 1.0,
            kinf_B: reaction['kinf_B'] || 0.0,
            kinf_C: reaction['kinf_C'] || 0.0,
            Fc: reaction['Fc'] || 0.6,
            N: reaction['N'] || 1.0,
            products: parseProducts(reaction),
            reactants: parseReactants(reaction)
          }
        }
      }
      case ReactionTypes.WENNBERG_NO_RO2: {
        return {
          ...reactionSchema.branched,
          id: id++,
          data: {
            ...reactionSchema.branched.data,
            X: reaction['X'] || 1.0,
            Y: reaction['Y'] || 0.0,
            a0: reaction['a0'] || 1.0,
            n: reaction['n'] || 0,
            reactants: parseReactants(reaction),
            primary_products: parseAlkoxyProducts(reaction['alkoxy products']),
            secondary_products: parseNitrateProducts(reaction['nitrate products'])
          },
        }
      }
      case ReactionTypes.WENNBERG_TUNNELING: {
        return {
          ...reactionSchema.tunneling,
          id: id++,
          data: {
            ...reactionSchema.tunneling.data,
            A: reaction['A'] || 1.0,
            B: reaction['B'] || 0.0,
            C: reaction['C'] || 0.0,
            reactants: parseReactants(reaction),
            products: parseProducts(reaction)
          },
        }
      }
      default:
        console.error(`Unknown reaction type: ${reaction.type}`);
        return { id: id++, data: { type: "UNKNOWN" }, shortName() { return "" } }
    }
  })
  return {
    gasSpecies: config['species'].map((species) => ({ name: species, properties: [] })),
    reactions: reactions
  }
}

function translate_to_camp_config(config) {
  const parseReactants = (reactants) => reactants.map(({ name, qty }) => ({ [name]: { qty: qty } }));
  const parseProducts = (products) => products.map((product) => ({ [product.name]: { yield: product.yield } }));

  let species = config.gasSpecies.map((species) => {
    let camp_species = {
      "name": species.name,
      "type": "CHEM_SPEC",
    }
    species.properties.forEach(property => {
      switch (property.name) {
        case "absolute convergence tolerance [mol mol-1]":
          camp_species["absolute tolerance"] = property.value
          break;
        case "molecular weight [kg mol-1]":
          camp_species["molecular weight"] = property.value
          break;
        case "fixed concentration":
          camp_species["tracer type"] = property.value
          break;
        default:
          camp_species[property.name] = property.value
      }
    })
    return camp_species;
  })
  let reactions = config.reactions.map((reaction) => {
    let camp_reaction = {
      "type": reaction.data.type,
    }
    switch (reaction.data.type) {
      case ReactionTypes.ARRHENIUS: {
        let { type, products, reactants, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: parseReactants(reactants),
          products: parseProducts(products),
        }
        break;
      }
      case ReactionTypes.PHOTOLYSIS: {
        let { type, products, reactant, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: { [reactant]: {} },
          products: parseProducts(products),
        }
        break;
      }
      case ReactionTypes.EMISSION: {
        let { type, species, scaling_factor, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          "scaling factor": scaling_factor,
          species: species.name
        }
        break;
      }
      case ReactionTypes.FIRST_ORDER_LOSS: {
        let { type, species, scaling_factor, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          "scaling factor": scaling_factor,
          "species": species
        }
        break;
      }
      case ReactionTypes.TERNARY_CHEMICAL_ACTIVATION: {
        let { type, products, reactants, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: parseReactants(reactants),
          products: parseProducts(products)
        }
        break;
      }
      case ReactionTypes.TROE: {
        let { type, products, reactants, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: parseReactants(reactants),
          products: parseProducts(products)
        }
        console.log(camp_reaction)
        break;
      }
      case ReactionTypes.WENNBERG_NO_RO2: {
        let { type, reactants, primary_products, secondary_products, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: parseReactants(reactants),
          "alkoxy products": parseProducts(primary_products),
          "nitrate products": parseProducts(secondary_products),
        }
        break;
      }
      case ReactionTypes.WENNBERG_TUNNELING: {
        let { type, reactants, products, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: parseReactants(reactants),
          products: parseProducts(products)
        }
        break;
      }
      default:
        break
    }
    return camp_reaction
  })
  reactions = {
    "type": "MECHANISM",
    "reactions": reactions
  }

  let camp_config = { "camp-data": [...species, reactions] }

  return camp_config;
}

function translate_to_musicbox_conditions(conditions) {
  console.log(conditions)

  let intial_value_reducer = (acc, curr) => {
    acc[curr.name] = {[`initial value [${curr.units}]`]: parseFloat(curr.value)}
    return acc;
  };

  let musicbox_conditions = {
    "box model options": { 
      "grid": "box",
      [`chemistry time step [${conditions.basic.chemistry_time_step_units}]`]: conditions.basic.chemistry_time_step,
      [`output time step [${conditions.basic.output_time_step_units}]`]: conditions.basic.output_time_step,
      [`simulation length [${conditions.basic.simulation_time_units}]`]: conditions.basic.simulation_time,
    },
    "chemical species": { 
      ...conditions.initial_species_concentrations.reduce(intial_value_reducer, {})
    },
    "environmental conditions": {
      ...conditions.initial_environmental.reduce(intial_value_reducer, {})
     },
    "evolving conditions": { },
    "model components": [ ]
  }

  return musicbox_conditions;
}

export {
  translate_from_camp_config,
  translate_to_camp_config,
  translate_to_musicbox_conditions
}