import AddCondition from "./AddCondition";
import EnvironmentalCondition from "../../components/Conditions/EnvironmentalCondition";
import React from "react";
import ReactionCondition from "../../components/Conditions/ReactionCondition";
import SpeciesCondition from "../../components/Conditions/SpeciesCondition";
import { connect } from "react-redux";
import { getConditions, getPossibleEvolvingReactionConditions } from "../../redux/selectors";
import { getMechanism } from "../../redux/selectors";

const initialConditionsSchema = {
  species_concentrations: {
    label: "Species Concentrations",
    nameLabel: "Species name",
    allowAddRemove: true,
    classKey: "initial_species_concentrations",
    getComponent(condition, schema) {
      return <SpeciesCondition condition={condition} schema={schema} />;
    },
    units: ["mol m-3", "mol cm-3", "molec m-3", "molec cm-3"],
  },
  environmental: {
    label: "Environmental Conditions",
    nameLabel: "Property",
    allowAddRemove: false,
    classKey: "initial_environmental",
    getComponent(condition, schema) {
      return <EnvironmentalCondition condition={condition} schema={schema} />;
    },
    units: {
      temperature: ["K", "C", "F"],
      pressure: ["Pa", "atm", "bar", "kPa", "hPa", "mbar"],
    },
  },
  reactions: {
    label: "Reaction Rates and Rate Constants",
    nameLabel: "Reaction label",
    allowAddRemove: true,
    classKey: "initial_reactions",
    getComponent(condition, schema) {
      return <ReactionCondition condition={condition} schema={schema} />;
    },
  }
};

const ConditionsList = (props) => {
  return (
    <div className="card mb-4 p-0 shadow-sm">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-0">{props.schema.label}</h4>
        {props.schema.allowAddRemove && props.remainingUnusedConditions > 0 ? (
          <AddCondition schema={props.schema} />
        ) : null}
      </div>
      <div className="bg-ncar-body p-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5">{props.schema.nameLabel}</div>
            <div className="col-3">Initial value</div>
            <div className="col-3">Units</div>
          </div>
          {props?.conditions?.map((condition) => {
            return (
              <div
                key={`condition-${condition.id}`}
                className="row my-1 row-data"
              >
                {props.schema.getComponent(condition, props.schema)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function InitialConditionsTab(props) {
  return (
    <>
      <p className="lead-muted p-2">
        Initial environmental conditions, concentrations for chemical species,
        and reaction rates/rate constants that have a MUSICA name can be set
        here. The conditions you set here will remain at the value you specify
        until updated by the solver (as is the case for chemical species
        concentrations) or overwritten by evolving conditions you specify.
      </p>
      <div className="configbox container-fluid">
        <ConditionsList
          schema={initialConditionsSchema.species_concentrations}
          conditions={props.speciesConcentrations}
          remainingUnusedConditions={props.unusedSpeciesConcentrations}
        />

        <ConditionsList
          schema={initialConditionsSchema.environmental}
          conditions={props.environmentalConditions}
        />

        <ConditionsList
          schema={initialConditionsSchema.reactions}
          conditions={props.reactionConditions}
          remainingUnusedConditions={props.unusedReactionConditions}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const sort = (a, b) => a?.name?.localeCompare(b?.name);
  const environmentalConditions = getConditions(state, initialConditionsSchema.environmental)?.sort(sort);
  const speciesConcentrations = getConditions(state, initialConditionsSchema.species_concentrations)?.sort(sort);
  const reactionConditions = getConditions(state, initialConditionsSchema.reactions)?.sort(sort);

  let unusedSpeciesConcentrations = 0;
  let unusedReactionConditions = 0;

  const mechanism = getMechanism(state);
  // -1 below because M is always a species in the gas phase
  // but you cannot set its concentration
  unusedSpeciesConcentrations = mechanism.gasSpecies.length - 1 - (environmentalConditions?.length || 0);

  const possibleCondtions = getPossibleEvolvingReactionConditions(state);
  unusedReactionConditions = possibleCondtions.length - (reactionConditions?.length || 0);

  return {
    environmentalConditions: environmentalConditions,
    speciesConcentrations: speciesConcentrations,
    reactionConditions: reactionConditions,
    unusedSpeciesConcentrations: unusedSpeciesConcentrations,
    unusedReactionConditions: unusedReactionConditions,
  };
};

export default connect(mapStateToProps)(InitialConditionsTab);