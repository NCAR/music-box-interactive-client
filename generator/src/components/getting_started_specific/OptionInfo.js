import React from "react";

export default function OptionInfo(props) {
    return (
        <div className="col">
            <div className="card mb-4 shadow-sm">
                <div className="card-header">
                    <h4 className="my-0 fw-normal">{props.option}</h4>
                </div>
                <div className="card-body">
                    <p>
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    )
}