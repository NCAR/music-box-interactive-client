import React from "react";

export default function InfoCard(props) {
    console.log(props.option)

    return (
        <div className="col">
            <div className="card mb-4 shadow-sm">
                <div className="card-header text-center">
                    <h4 className="my-0 fw-normal" dangerouslySetInnerHTML={{__html: props.option}}></h4>
                </div>
                <div className="card-body">
                    <p dangerouslySetInnerHTML={{__html: props.description}}>
                    </p>
                </div>
            </div>
        </div>
    )
}