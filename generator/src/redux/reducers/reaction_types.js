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
        data: {
            type: "ARRHENIUS",
            A: 1.0,
            Ea: 0.0,
            B: 0.0,
            D: 300.0,
            E: 0.0,
            reactants: [],
            products: []
        },
        typeLabel: "Arrhenius",
        shortName() { return stringifyReaction( this.data.reactants, this.data.products ); }
    },
    emission: {
        data: {
            type: "EMISSION",
            species: undefined,
            scaling_factor: 1.0
        },
        typeLabel: "Emission",
        shortName() { return stringifyReaction( [ ], this.data.species !== undefined ?
                                                     [ this.data.species ] : [ ] ); }
    },
    firstOrderLoss: {
        data: {
            type: "FIRST_ORDER_LOSS",
            species: undefined,
            scaling_factor: 1.0
        },
        typeLabel: "First-Order Loss",
        shortName() { return stringifyReaction( this.data.species !== undefined ?
                                                [ this.data.species ] : [ ], [ ] ); }
    },
    photolysis: {
        data: {
            type: "PHOTOLYSIS",
            reactant: undefined,
            products: [],
            scaling_factor: 1.0
        },
        typeLabel: "Photolysis",
        shortName() { return stringifyReaction( this.data.reactant !== undefined ?
                                                [ this.data.reactant ] : [ ],
                                                this.data.products ); }
    },
    ternaryChemicalActivation: {
        data: {
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
            products: []
        },
        typeLabel: "Ternary Chemical Activation",
        shortName() { return stringifyReaction( this.data.reactants, this.data.products ); }
    },
    troe: {
        data: {
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
            products: []
        },
        typeLabel: "Troe (Fall-Off)",
        shortName() { return stringifyReaction( this.data.reactants, this.data.products ); }
    },
    branched: {
        data: {
            type: "WENNBERG_NO_RO2",
            X: 1.0,
            Y: 0.0,
            a0: 1.0,
            n: 0,
            reactants: [],
            primary_products: [],
            secondary_products: []
        },
        typeLabel: "Branched",
        shortName() { return stringifyReaction( this.data.reactants, this.data.primary_products ); }
    },
    tunneling: {
        data: {
            type: "WENNBERG_TUNNELING",
            A: 1.0,
            B: 0.0,
            C: 0.0,
            reactants: [],
            products: []
        },
        typeLabel: "Tunneling",
        shortName() { return stringifyReaction( this.data.reactants, this.data.products ); }
    }
}

export default reactionTypes;
