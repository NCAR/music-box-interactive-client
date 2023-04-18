import React from 'react'

const generateExamples = (titles, descriptions) => {
    const res = []
    for (let i = 0; i < titles.length; i++) {
        res.push(
            <div className="col" key={i}>
                <div className="card card-body example-panel m-2">
                    <div>
                        <h3>{titles[i]}</h3>
                    </div>
                    <div>
                        {descriptions[i]}
                    </div>
                    <span className="btn btn-secondary">Select</span>
                </div>
            </div>
        )
    }
    return res
}

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

    const examples = generateExamples(titles, descriptions)

    return (
        <div className="row">
            {examples}
        </div>
    )
}