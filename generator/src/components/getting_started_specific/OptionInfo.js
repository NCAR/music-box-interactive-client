import React from "react";

export default function OptionInfo(props) {
    return (
        <div class="col">
            <div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h4 class="my-0 fw-normal">{props.option}</h4>
                </div>
                <div class="card-body">
                    <p>
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    )
}