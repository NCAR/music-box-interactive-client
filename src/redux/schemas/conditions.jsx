import React from "react";
import SpeciesCondition from "../../components/Conditions/SpeciesCondition";
import EnvironmentalCondition from "../../components/Conditions/EnvironmentalCondition";
import ReactionCondition from "../../components/Conditions/ReactionCondition";

export const basicConfigSchema = [
  {
    type: "FLOAT",
    label: "Chemistry time step",
    key: "chemistry_time_step",
    units: {
      values: ["sec", "min", "hour", "day"],
      key: "chemistry_time_step_units",
    },
  },
  {
    type: "FLOAT",
    label: "Output time step",
    key: "output_time_step",
    units: {
      values: ["sec", "min", "hour", "day"],
      key: "output_time_step_units",
    },
  },
  {
    type: "FLOAT",
    label: "Simulation time",
    key: "simulation_time",
    units: {
      values: ["sec", "min", "hour", "day"],
      key: "simulation_time_units",
    },
  },
];

export const initialConditionsSchema = [
  {
    label: "Species Concentrations",
    nameLabel: "Species name",
    classKey: "initial_species_concentrations",
    allowAddRemove: true,
    getComponent(condition, schema) {
      return <SpeciesCondition condition={condition} schema={schema} />;
    },
    units: ["mol m-3", "mol cm-3", "molec m-3", "molec cm-3"],
  },
  {
    label: "Environmental Conditions",
    nameLabel: "Property",
    classKey: "initial_environmental",
    allowAddRemove: false,
    getComponent(condition, schema) {
      return <EnvironmentalCondition condition={condition} schema={schema} />;
    },
    units: {
      temperature: ["K", "C", "F"],
      pressure: ["Pa", "atm", "bar", "kPa", "hPa", "mbar"],
    },
  },
  {
    label: "Reaction Rates and Rate Constants",
    nameLabel: "Reaction label",
    classKey: "initial_reactions",
    allowAddRemove: true,
    getComponent(condition, schema) {
      return <ReactionCondition condition={condition} schema={schema} />;
    },
  },
];
