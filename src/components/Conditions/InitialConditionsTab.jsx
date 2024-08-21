import React from "react";
import { connect } from "react-redux";
import ConditionsList from "./ConditionsList";
import SpeciesCondition from "../../components/Conditions/SpeciesCondition";
import EnvironmentalCondition from "../../components/Conditions/EnvironmentalCondition";
import ReactionCondition from "../../components/Conditions/ReactionCondition";
import ConditionTable from "./ConditionTable";
import { getConditions, getUserDefinedRatesIds, getVariableSpeciesNames } from "../../redux/selectors";
import Stack from '@mui/material/Stack';

const initialConditionsSchema = {
  speciesConcentrations: {
    label: "Species Concentrations",
    nameLabel: "Species name",
    classKey: "initial_species_concentrations",
    allowAddRemove: true,
    getComponent(condition, schema) {
      return <SpeciesCondition condition={condition} schema={schema} />;
    },
    units: ["mol m-3", "mol cm-3", "molec m-3", "molec cm-3"],
  },
  environmentalConditions: {
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
  reactionConditions: {
    label: "Reaction Rates and Rate Constants",
    nameLabel: "Reaction label",
    classKey: "initial_reactions",
    allowAddRemove: true,
    getComponent(condition, schema) {
      return <ReactionCondition condition={condition} schema={schema} />;
    },
  },
};

function InitialConditionsTab(props) {
  return (
    <Stack spacing={2} sx={{margin: `2%`}}>
      <p className="lead-muted p-2">
        Initial environmental conditions, concentrations for chemical species,
        and reaction rates/rate constants that have a MUSICA name can be set
        here. The conditions you set here will remain at the value you specify
        until updated by the solver (as is the case for chemical species
        concentrations) or overwritten by evolving conditions you specify.
      </p>
      <ConditionTable
        title="Species Concentrations"
        data={props.speciesConditons.existing}
        availableNames={props.speciesConditons.missing}
        getUnits={() => [null, ...initialConditionsSchema.speciesConcentrations.units]}
        schema={initialConditionsSchema.speciesConcentrations}
      />
      <ConditionTable
        title="Envionmental Concentrations"
        data={props.environmentalConditions}
        getUnits={(condition) => initialConditionsSchema.environmentalConditions.units[condition.name]}
        schema={initialConditionsSchema.environmentalConditions}
      />
      <ConditionsList schema={initialConditionsSchema.reactionConditions} />
    </Stack>
  );
}

const mapStateToProps = (state, ownProps) => {
  let existingSpeciesConditions = getConditions(state, initialConditionsSchema.speciesConcentrations);
  const possibleNames = getVariableSpeciesNames(state);
  const speciesNames = possibleNames.filter(
    (name) => !existingSpeciesConditions.find((condition) => condition.name === name),
  );

  let environmentalConditions = getConditions(state, initialConditionsSchema.environmentalConditions);
  console.log(environmentalConditions)

  return {
    speciesConditons: {
      missing: speciesNames,
      existing: existingSpeciesConditions,
    },
    environmentalConditions: environmentalConditions
  }
};

export default connect(mapStateToProps)(InitialConditionsTab);
