const options = [
  {
    displayName: "description",
    name: "description",
    "data-type": "string",
    value: "",
  },
  {
    displayName: "absolute convergence tolerance",
    name: "absolute convergence tolerance [mol mol-1]",
    "data-type": "number",
    value: 1e-12,
  },
  {
    displayName: "molecular weight",
    name: "molecular weight [kg mol-1]",
    "data-type": "number",
    value: 0,
  },
  {
    displayName: "fixed concentration",
    name: "fixed concentration",
    "data-type": "string",
    value: "CONSTANT",
  },
];

const aerosol_options = [
  ...options,
  {
    displayName: "density",
    name: "density",
    "data-type": "number",
    value: 0,
  },
  {
    displayName: "kappa",
    name: "kappa",
    "data-type": "number",
    value: 0,
  },
];

export { options as gas_options, aerosol_options };
