import React from "react"

export default function Step(props) {
    return (
        <div className="p-3">
            <p className="lead">
                <strong className="about-heading">Step {props.count}. </strong>
                <span dangerouslySetInnerHTML={{__html: props.description}}></span>
            </p>
        </div>
    )
}