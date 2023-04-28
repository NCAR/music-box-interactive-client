import { reactionSchema } from '../redux/schemas'
import { ReactionTypes } from './models'

function extract_mechanism_from_example(config) {
  const campReactantsToRedux = (reaction) => Object.entries(reaction.reactants).map(([name, props]) => ({ name: name, qty: props.qty || 1 }));
  const campProductsToRedux = (reaction) => Object.entries(reaction.products).map(([name, props]) => ({ name: name, yield: props.yield || 1 }));
  const campAlkoxyProductsToRedux = (products) => Object.entries(products).map(([name, props]) => ({ name: name, yield: props.yield || 1 }));
  const campNitrateProductsToRedux = campAlkoxyProductsToRedux;
  let id = 0;
  let camp_reactions = config.mechanism.reactions['camp-data'] || [];
  let camp_species = config.mechanism.species['camp-data'] || [];

  if (camp_reactions.length > 0) {
    camp_reactions = camp_reactions[0].reactions
  }

  const species = camp_species.map((species) => {
    let properties = []
    Object.keys(species).forEach((key) => {
      switch (key) {
        case "tracer type": {
          properties.push({
            name: "fixed concentration",
            value: species[key]
          })
          break;
        }
        case "absolute tolerance": {
          properties.push({
            name: "absolute convergence tolerance [mol mol-1]",
            value: species[key]
          })
          break;
        }
        case "molecular weight": {
          properties.push({
            name: "molecular weight [kg mol-1]",
            value: species[key]
          })
          break;
        }
        default:
          break;
      }
    })
    return { name: species.name, properties: properties }
  });

  const reactions = camp_reactions.map(reaction => {
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
            products: campProductsToRedux(reaction),
            reactants: campReactantsToRedux(reaction)
          }
        }
      }
      case ReactionTypes.PHOTOLYSIS: {
        return {
          ...reactionSchema.photolysis,
          id: id++,
          data: {
            ...reactionSchema.photolysis.data,
            reactant: campReactantsToRedux(reaction)[0].name,
            products: campProductsToRedux(reaction),
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
            reactants: campReactantsToRedux(reaction),
            products: campProductsToRedux(reaction)
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
            products: campProductsToRedux(reaction),
            reactants: campReactantsToRedux(reaction)
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
            reactants: campReactantsToRedux(reaction),
            primary_products: campAlkoxyProductsToRedux(reaction['alkoxy products']),
            secondary_products: campNitrateProductsToRedux(reaction['nitrate products'])
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
            reactants: campReactantsToRedux(reaction),
            products: campProductsToRedux(reaction)
          },
        }
      }
      default:
        console.error(`Unknown reaction type: ${reaction.type}`);
        return { id: id++, data: { type: "UNKNOWN" }, shortName() { return "" } }
    }
  })
  return {
    gasSpecies: species,
    reactions: reactions
  }
}

function extract_conditions_from_example(config) {
  const units_re = /\[(.*?)\]/;

  let box_options = config.conditions['box model options'];

  let basic = Object.keys(box_options).reduce((acc, key) => {
    if (key.includes("chemistry time step")) {
      acc['chemistry_time_step'] = box_options[key];

      // check for units
      const matches = units_re.exec(key);
      if (matches) {
        acc['chemistry_time_step_units'] = matches[1];
      } else {
        acc['chemistry_time_step_units'] = 'sec';
        console.warn("No chemistry time step units found. Using default (sec).");
      }
    }
    if (key.includes("output time step")) {
      acc['output_time_step'] = box_options[key];

      // check for units
      const matches = units_re.exec(key);
      if (matches) {
        acc['output_time_step_units'] = matches[1];
      } else {
        acc['output_time_step_units'] = 'sec';
        console.warn("No output time step units found. Using default (sec).");
      }
    }
    if (key.includes("simulation length")) {
      acc['simulation_time'] = box_options[key];

      // check for units
      const matches = units_re.exec(key);
      if (matches) {
        acc['simulation_time_units'] = matches[1];
      } else {
        acc['simulation_time_units'] = 'sec';
        console.warn("No output time step units found. Using default (sec).");
      }
    }

    return acc;
  }, {});

  let conditions = config.conditions['environmental conditions'];
  let temperature = { id: 0, name: "temperature", 'value': 298.15, 'units': "K" }
  let pressure = { id: 1, name: "pressure", value: 101325.0, units: "Pa" };

  if ('temperature' in conditions) {
    Object.keys(conditions['temperature']).forEach((key) => {
      const matches = units_re.exec(key);
      if (matches) {
        temperature['value'] = conditions['temperature'][key];
        temperature['units'] = matches[1];
      } else {
        console.warn(`No initial temperature, using ${temperature.value} ${temperature.units}.`)
      }
    });
  }
  else {
    console.warn(`No initial temperature, using ${temperature.value} ${temperature.units}.`)
  }

  if ('pressure' in conditions) {
    Object.keys(conditions['pressure']).forEach((key) => {
      const matches = units_re.exec(key);
      if (matches) {
        pressure['value'] = conditions['pressure'][key];
        pressure['units'] = matches[1];
      } else {
        console.warn(`No initial pressure, using ${pressure.value} ${pressure.units}.`)
      }
    });
  }
  else {
    console.warn(`No initial pressure, using ${pressure.value} ${pressure.units}.`)
  }

  let species = config.conditions["chemical species"];
  let id = 0;
  let initial_species_concentrations = Object.keys(species).map((spec) => {
    const concentration_units = Object.keys(species[spec])[0]
    const matches = units_re.exec(concentration_units);
    return {
      id: id++,
      name: spec,
      units: matches[1],
      value: species[spec][concentration_units],
    }
  })

  id = 0;
  let initial_conditions = config.conditions["initial conditions"]
  let reaction_conditions = []
  if (initial_conditions) {
    reaction_conditions = Object.keys(initial_conditions).map((key) => {
      let [type, reaction, units] = key.split(".")
      let default_units = '';
      if (type === "LOSS") {
        default_units = 'mol m-3 s-1';
      }
      else if (type === "EMIS") {
        default_units = 'mol m-3 s-1';
      }
      else if (type === "PHOT") {
        default_units = 's-1';
      }
      return {
        id: id++,
        name: reaction,
        value: initial_conditions[key]["0"],
        type: type,
        units: units || default_units
      }
    });
  }

  id = 0;
  let evolving_conditions = config.conditions["evolving conditions"]
  let evolving = {
    times: [],
    values: []
  }
  if (evolving_conditions) {
    Object.keys(evolving_conditions).forEach((key) => {
      if (key.includes('time')) {
        evolving.times = Object.values(evolving_conditions[key])
      }
      else {
        let [type, name, units] = key.split(".")
        if (!units) {
          if (type === "PHOT") {
            units = 'mol m-3'
          }
        }
        evolving.values.push({
          name: `${name} [${units}]`,
          tableName: key,
          values: evolving_conditions[key]
        })
      }
    });
  }

  let schema = {
    basic: basic,
    initial_species_concentrations: initial_species_concentrations,
    initial_environmental: [temperature, pressure],
    initial_reactions: reaction_conditions,
    evolving: evolving,
    model_components: config.conditions["model components"]
  }
  return schema;
}

function translate_reactions_to_camp_config(config) {
  const reduxReactantsToCamp = (reactants) => reactants.reduce((acc, reactant) => {
    acc[reactant.name] = { qty: reactant.qty === undefined ? 1 : reactant.qty };
    return acc;
  }, {});

  const reduxProductsToCamp = (products) => products.reduce((acc, product) => {
    acc[product.name] = { yield: product.yield === undefined ? 1.0 : product.yield };
    return acc;
  }, {});
  let reactions = config.reactions.map((reaction, reactionId) => {
    const irrSpecies = `irr__${reactionId}`
    let camp_reaction = {
      "type": reaction.data.type,
    }
    switch (reaction.data.type) {
      case ReactionTypes.ARRHENIUS: {
        let { type, products, reactants, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: {...reduxReactantsToCamp(reactants)},
          products: {...reduxProductsToCamp([...products, { name: irrSpecies }])},
        }
        break;
      }
      case ReactionTypes.PHOTOLYSIS: {
        let { type, products, reactant, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: { [reactant]: {} },
          products: {...reduxProductsToCamp([...products, { name: irrSpecies }])}
        }
        break;
      }
      case ReactionTypes.EMISSION: {
        let { type, species, scaling_factor, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          "scaling factor": scaling_factor,
          species: species.name,
          products: {...reduxProductsToCamp({ name: irrSpecies })}
        }
        break;
      }
      case ReactionTypes.FIRST_ORDER_LOSS: {
        let { type, species, scaling_factor, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          "scaling factor": scaling_factor,
          "species": species,
          products: {...reduxProductsToCamp({ name: irrSpecies })}
        }
        break;
      }
      case ReactionTypes.TERNARY_CHEMICAL_ACTIVATION: {
        let { type, products, reactants, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: {...reduxReactantsToCamp(reactants)},
          products: {...reduxProductsToCamp([...products, { name: irrSpecies }])}
        }
        break;
      }
      case ReactionTypes.TROE: {
        let { type, products, reactants, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: {...reduxReactantsToCamp(reactants)},
          products: {...reduxProductsToCamp([...products, { name: irrSpecies }])}
        }
        break;
      }
      case ReactionTypes.WENNBERG_NO_RO2: {
        let { type, reactants, primary_products, secondary_products, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: {...reduxReactantsToCamp(reactants)},
          "alkoxy products": {...reduxProductsToCamp([...primary_products, { name: `${irrSpecies}a` }])},
          "nitrate products": {...reduxProductsToCamp([...secondary_products, { name: `${irrSpecies}b` }])},
        }
        break;
      }
      case ReactionTypes.WENNBERG_TUNNELING: {
        let { type, reactants, products, ...data } = reaction.data
        camp_reaction = {
          ...camp_reaction,
          ...data,
          reactants: {...reduxReactantsToCamp(reactants)},
          products: {...reduxProductsToCamp([...products, { name: irrSpecies }])}
        }
        break;
      }
      default:
        break
    }
    return camp_reaction
  })
  return {
    "type": "MECHANISM",
    "name": "music box interactive configuration",
    "reactions": reactions
  }
}

function translate_to_camp_config(config) {
  let species = [ ...config.gasSpecies.map((species) => {
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
  }),
  ...config.reactions.reduce((irrList, reaction, reactionId) => {
    const irrSpecies = `irr__${reactionId}`
    if (reaction.data.type === ReactionTypes.WENNBERG_NO_RO2) {
      irrList.push({
        name: `${irrSpecies}a`,
        type: "CHEM_SPEC"
      })
      irrList.push({
        name: `${irrSpecies}b`,
        type: "CHEM_SPEC"
      })
    } else {
      irrList.push({
        name: irrSpecies,
        type: "CHEM_SPEC"
      })
    }
    return irrList
  }, []) ]
  let reactions = translate_reactions_to_camp_config(config)

  let camp_config = { "camp-data": [...species, reactions] }

  return camp_config;
}

function translate_to_musicbox_conditions(conditions) {
  let intial_value_reducer = (acc, curr) => {
    acc[curr.name] = { [`initial value [${curr.units}]`]: parseFloat(curr.value) }
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
    "evolving conditions": conditions.evolving,
    "initial conditions": {
      ...conditions.initial_reactions.reduce((acc, curr) => {
        let key = `${curr.type}.${curr.name}.${curr.units}`;
        acc[key] = curr.value;
        return acc
      }, {})
    },
    "model components": conditions.model_components
  }

  return musicbox_conditions;
}

export {
  extract_conditions_from_example,
  extract_mechanism_from_example,
  translate_reactions_to_camp_config,
  translate_to_camp_config,
  translate_to_musicbox_conditions
}
