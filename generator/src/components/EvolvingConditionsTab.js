import React from "react"
import { connect } from 'react-redux';
import EvolvingConditionsDetail from "./EvolvingConditionsDetail";

function EvolvingConditionsTab(props) {

  return (
    <>
      <p className="lead-muted p-2">
Load files containing model conditions that change during the simulation. These can be environmental conditions, chemical species concentrations, or rates/rate constants for reactions with a MUSICA name. Evolving conditions take precedence over initial conditions.
      </p>
      <EvolvingConditionsDetail />
    </>
  )
}

export default connect()(EvolvingConditionsTab)
