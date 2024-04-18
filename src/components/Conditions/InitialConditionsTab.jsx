import React from "react";
import { connect } from "react-redux";
import { initialConditionsSchema } from "../../redux/schemas";
import ConditionsList from "./ConditionsList";

function InitialConditionsTab(props) {
  const [ speciesConditionSchema, environmentalConditionSchema, reactionConditionSchema ] = initialConditionsSchema
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
        <div className="row m-2">
          <ConditionsList schema={speciesConditionSchema} />
        </div>
        <div className="row m-2">
          <ConditionsList schema={environmentalConditionSchema} />
        </div>
        <div className="row m-2">
          <ConditionsList schema={reactionConditionSchema} />
        </div>
      </div>
    </>
  );
}

export default connect()(InitialConditionsTab);
