const stringifyReaction = (reactants, products) => {
  const validReactants = reactants.filter((species) => {
    return species.name !== undefined;
  });
  const validProducts = products.filter((species) => {
    return species.name !== undefined;
  });
  let str = "";
  if (validReactants.length > 0) {
    validReactants.forEach((species) => {
      str +=
        "qty" in species && species.qty > 1
          ? species.qty.toString() + species.name + " + "
          : species.name + " + ";
    });
    str = str.slice(0, -2) + " -> ";
  } else {
    str = "<none> -> ";
  }
  if (validProducts.length > 0) {
    validProducts.forEach((species) => {
      str +=
        "yield" in species && species.yield !== 1.0
          ? species.yield.toString() + species.name + " + "
          : species.name + " + ";
    });
    str = str.slice(0, -3);
  } else {
    str += " <none>";
  }
  return str.length > 40 ? str.slice(0, 37) + "..." : str;
};

const countReactants = (reactants) => {
  let counter = {};
  reactants.forEach(({ name }) => {
    if (counter[name]) {
      counter[name] += 1;
    } else {
      counter[name] = 1;
    }
  });
  return Object.keys(counter).map((species) => {
    return {
      name: species,
      coefficient: counter[species],
    };
  });
};

const RunStatus = Object.freeze({
  RUNNING: "RUNNING",
  WAITING: "WAITING",
  NOT_FOUND: "NOT_FOUND",
  DONE: "DONE",
  ERROR: "ERROR",
});

const ReactionTypes = Object.freeze({
  ARRHENIUS: "ARRHENIUS",
  PHOTOLYSIS: "PHOTOLYSIS",
  EMISSION: "EMISSION",
  FIRST_ORDER_LOSS: "FIRST_ORDER_LOSS",
  TERNARY_CHEMICAL_ACTIVATION: "TERNARY_CHEMICAL_ACTIVATION",
  TROE: "TROE",
  WENNBERG_NO_RO2: "WENNBERG_NO_RO2",
  WENNBERG_TUNNELING: "WENNBERG_TUNNELING",
  shortName(reaction) {
    switch (reaction.data.type) {
      case this.ARRHENIUS:
      case this.TERNARY_CHEMICAL_ACTIVATION:
      case this.TROE:
      case this.WENNBERG_TUNNELING:
        return stringifyReaction(
          reaction.data.reactants,
          reaction.data.products,
        );
      case this.EMISSION:
        return stringifyReaction(
          [],
          reaction.data.species !== undefined
            ? [{ name: reaction.data.species }]
            : [],
        );
      case this.FIRST_ORDER_LOSS:
        return stringifyReaction(
          reaction.data.species !== undefined
            ? [{ name: reaction.data.species }]
            : [],
          [],
        );
      case this.PHOTOLYSIS:
        return stringifyReaction(
          reaction.data.reactant !== undefined
            ? [{ name: reaction.data.reactant }]
            : [],
          reaction.data.products,
        );
      case this.WENNBERG_NO_RO2:
        return stringifyReaction(
          reaction.data.reactants,
          reaction.data.primary_products,
        );
    }
  },
  reactants(reaction) {
    switch (reaction.data.type) {
      case this.ARRHENIUS:
      case this.TERNARY_CHEMICAL_ACTIVATION:
      case this.TROE:
      case this.WENNBERG_TUNNELING:
      case this.WENNBERG_NO_RO2:
        return countReactants(reaction.data.reactants);
      case this.EMISSION:
        return [];
      case this.FIRST_ORDER_LOSS:
        return reaction.data.species !== undefined
          ? [
              {
                name: reaction.data.species,
                coefficient: 1.0,
              },
            ]
          : [];
      case this.PHOTOLYSIS:
        return reaction.data.reactant !== undefined
          ? [
              {
                name: reaction.data.reactant,
                coefficient: 1.0,
              },
            ]
          : [];
    }
  },
  products(reaction) {
    switch (reaction.data.type) {
      case this.ARRHENIUS:
      case this.TERNARY_CHEMICAL_ACTIVATION:
      case this.TROE:
      case this.WENNBERG_TUNNELING:
      case this.PHOTOLYSIS:
        return reaction.data.products;
      case this.EMISSION:
        return reaction.data.species !== undefined
          ? [
              {
                name: reaction.data.species,
                yield: 1.0,
              },
            ]
          : [];
      case this.FIRST_ORDER_LOSS:
        return [];
      case this.WENNBERG_NO_RO2:
        return [
          ...reaction.data.primary_products,
          ...reaction.data.secondary_products,
        ];
    }
  },
});

export { ReactionTypes, RunStatus };
