import React from "react";

export default function MethodButton(props) {

    return (
        <button className="btn btn-primary btn-lg btn-ncar-active my-2 mx-3" onClick={props.clickHandler}>
            {props.children}
        </button>
    )
}

