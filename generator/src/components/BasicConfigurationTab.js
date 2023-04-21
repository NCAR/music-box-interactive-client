import React from "react"
import { connect } from 'react-redux'
import BasicConfiguration from './BasicConfiguration';

function BasicConfigurationTab(props) {

  return (
    <>
        <p className="lead-muted p-2">
            Set general conditions for your simulation here, including how long a time you would like to simulate and how often output data are written. The chemistry time step determines the time step of the ODE solver. We recommend an output time step of 1/100 of the simulation time and a chemistry time step equal to the output time step as a first start.
        </p>
        <BasicConfiguration />
    </>
  )
}

export default connect()(BasicConfigurationTab)
