import React from "react";
import { connect } from "react-redux";

const GasSpecies = ({ species }) => {
    return (
        <li className="list-group-item list-group-item-action d-flex justify-content-between detailitem">
            <span>
                {species.name}
            </span>
        </li>
    );
};

export default connect()(GasSpecies);
