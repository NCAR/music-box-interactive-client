import React from 'react'

export default function Examples() {
    const titles = [
        "Chapman Cycle",
        "Flow-Tube Wall Loss",
        "Full Gas-Phase Mechanism"
    ]
    const descriptions = [
        "Chemistry of the ozone layer.",
        "A simple characterization of wall loss of a-Pinene oxidation products in a flow-tube reactor.",
        "A variant of the Carbon Bond 5 chemical mechanism used in the MONARCH global/regional chemical weather prediction system."
    ]
    const generateExamples = () => {
        const res = []
        for (let i = 0; i < titles.length; i++) {
            res.push(<Example title={titles[i]} description={descriptions[i]} key={i}/>)
        }
        return res
    }

    const examples = generateExamples()
    console.log(examples)

    return (
        <div className="row">
            {examples}
        </div>
    )
}

function Example(props) {
    return (
    <div className="col">
         <div className="card card-body example-panel m-2">
             <div>
                 <h3>{props.title}</h3>
             </div>
             <div>
                 {props.description}
             </div>
             <SelectButton />
         </div>
    </div>
  )
}

// TODO: update centralized states accordingly
function SelectButton(props) {
    return (
        <a className="btn btn-secondary">Select</a>
    )
}