const stringifyReaction = (reactants, products) => {
  const validReactants = reactants.filter(species => {
      return species.name !== undefined;
  });
  const validProducts = products.filter(species => {
      return species.name !== undefined;
  });
  let str = "";
  if (validReactants.length > 0) {
      validReactants.forEach(species => {
        str += "qty" in species  && species.qty > 1 ?
                 species.qty.toString() + species.name + " + "
                 : species.name + " + ";
      });
      str = str.slice(0, -2) + " -> ";
  } else {
      str = "<none> -> ";
  }
  if (validProducts.length > 0) {
      validProducts.forEach(species => {
          str += "yield" in species  && species.yield !== 1.0 ?
                   species.yield.toString() + species.name + " + "
                   : species.name + " + ";
      });
      str = str.slice(0, -3);
  } else {
      str += " <none>";
  }
  return str.length > 50 ? str.slice(0, 16) + "..."  : str;
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
        shortName() { return stringifyReaction( this.data.reactants, this.data.products ); },
        elements: [
            {
                type: "REACTANT_LIST",
                key: "reactants",
                label: "reactants"
            },
            {
                type: "DESCRIPTION",
                text: "Use the 'qty' property when a species appears more than once as a reactant"
            },
            {
                type: "PRODUCT_LIST",
                key: "products",
                label: "products",
            },
            {
                type: "EQUATION",
                value: "k = Ae^{(\\frac{-E_a}{k_bT})}(\\frac{T}{D})^B(1.0+E*P)",
                description: "k<sub>B</sub>: Boltzmann constant (J K<sup>-1</sup>); T: temperature (K); P: pressure (Pa)"
            },
            {
                type: "FLOAT",
                key: "A",
                label: "A",
                units: "(# cm<sup>-3</sup>)<sup>-(n-1)</sup> s<sup>-1</sup>"
            },
            {
                type: "FLOAT",
                key: "Ea",
                label: "Ea",
                units: "J"
            },
            {
                type: "FLOAT",
                key: "B",
                label: "B",
                units: "unitless"
            },
            {
                type: "FLOAT",
                key: "D",
                label: "D",
                units: "K"
            },
            {
                type: "FLOAT",
                key: "E",
                label: "E",
                units: "Pa<sup>-1</sup>"
            }
        ]
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
