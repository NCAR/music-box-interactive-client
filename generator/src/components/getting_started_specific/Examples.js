import React from 'react'

const examples = [
    {
        title: "Chapman Cycle",
        description: "Chemistry of the ozone layer."
    },
    {
        title: "Flow-Tube Wall Loss",
        description: "A simple characterization of wall loss of a-Pinene oxidation products in a flow-tube reactor."
    },
    {
        title: "Full Gas-Phase Mechanism",
        description: "A variant of the Carbon Bond 5 chemical mechanism used in the MONARCH global/regional chemical weather prediction system."
    }
]


export default function Examples() {
    const renderExample = (example, index) => (
        <div className="col" key={index}>
          <div className="card card-body example-panel m-2">
            <div>
              <h3>{example.title}</h3>
            </div>
            <div>{example.description}</div>
            <span className="btn btn-secondary">Select</span>
          </div>
        </div>
      );
    
      return (
        <div className="row">
            {examples.map(renderExample)}
        </div>
      )
}