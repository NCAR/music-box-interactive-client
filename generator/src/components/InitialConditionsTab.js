import React from "react"
import { connect } from 'react-redux';

function InitialConditionsTab(props) {

  return (
    <>
      <p className="lead-muted p-2">
    Initial environmental conditions, concentrations for chemical species, and reaction rates/rate constants that have a MUSICA name can be set here. The conditions you set here will remain at the value you specify until updated by the solver (as is the case for chemical species concentrations) or overwritten by evolving conditions you specify.
      </p>
    </>
  )
}

export default connect()(InitialConditionsTab)
