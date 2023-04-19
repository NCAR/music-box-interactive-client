const stringifyReaction = (reactants, products) => {
  let str = reactants.length > 0 ? reactants.map(species => {
      return "qty" in species ? species.qty.toString() + species.name + " "
                              : species.name + " ";
    }) + " =>" : "<none> =>";
  str += products.length > 0 ? products.map(species => {
      return "yield" in species ? " " + species.yield.toString() + species.name
                                : " " + species.name;
  }) : " <none>";
  return str.length > 20 ? str.slice(0, 16) + "..."  : str;
}

const reactionTypes = {
    arrhenius: {
        type: "ARRHENIUS",
        A: 1.0,
        Ea: 0.0,
        B: 0.0,
        D: 300.0,
        E: 0.0,
        reactants: [],
        products: [],
        __meta: {
            label: "Arrhenius"
        },
        shortName() { return stringifyReaction( this.reactants, this.products ); }
    },
    emission: {
        type: "EMISSION",
        species: undefined,
        scaling_factor: 1.0,
        __meta: {
            label: "Emission"
        },
        shortName() { return stringifyReaction( [ ], this.species !== undefined ?
                                                     [ this.species ] : [ ] ); }
    },
    firstOrderLoss: {
        type: "FIRST_ORDER_LOSS",
        species: undefined,
        scaling_factor: 1.0,
        __meta: {
            label: "First-Order Loss"
        },
        shortName() { return stringifyReaction( this.species !== undefined ?
                                                [ this.species ] : [ ], [ ] ); }
    },
    photolysis: {
        type: "PHOTOLYSIS",
        reactant: undefined,
        products: [],
        scaling_factor: 1.0,
        __meta: {
            label: "Photolysis"
        },
        shortName() { return stringifyReaction( this.reactant !== undefined ?
                                                [ this.reactant ] : [ ], this.products ); }
    },
    ternaryChemicalActivation: {
        type: "TERNARY_CHEMICAL_ACTIVATION",
        k0_A: 1.0,
        k0_B: 0.0,
        k0_C: 0.0,
        kinf_A: 1.0,
        kinf_B: 0.0,
        kinf_C: 0.0,
        Fc: 0.6,
        N: 1.0,
        reactants: [],
        products: [],
        __meta: {
            label: "Ternary Chemical Activation"
        },
        shortName() { return stringifyReaction( this.reactants, this.products ); }
    },
    troe: {
        type: "TROE",
        k0_A: 1.0,
        k0_B: 0.0,
        k0_C: 0.0,
        kinf_A: 1.0,
        kinf_B: 0.0,
        kinf_C: 0.0,
        Fc: 0.6,
        N: 1.0,
        reactants: [],
        products: [],
        __meta: {
            label: "Troe (Fall-Off)"
        },
        shortName() { return stringifyReaction( this.reactants, this.products ); }
    },
    branched: {
        type: "WENNBERG_NO_RO2",
        X: 1.0,
        Y: 0.0,
        a0: 1.0,
        n: 0,
        reactants: [],
        primary_products: [],
        secondary_products: [],
        __meta: {
            label: "Branched"
        },
        shortName() { return stringifyReaction( this.reactants, this.primary_products ); }
    },
  tunneling: {
        type: "WENNBERG_TUNNELING",
        A: 1.0,
        B: 0.0,
        C: 0.0,
        reactants: [],
        products: [],
        __meta: {
            label: "Tunneling"
        },
        shortName() { return stringifyReaction( this.reactants, this.products ); }
    }
}

export default reactionTypes;
