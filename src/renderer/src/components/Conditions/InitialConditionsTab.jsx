import React from "react";
import { connect } from "react-redux";
import { initialConditionsSchema } from "../../redux/schemas";
import ConditionsList from "./ConditionsList";

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
        {initialConditionsSchema.map((schema, index) => {
          return (
            <div className="row m-2" key={`conditions-list-${index}`}>
              <ConditionsList schema={schema} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default connect()(InitialConditionsTab);
