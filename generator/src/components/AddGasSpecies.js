import React, { useState } from "react";
import { connect } from "react-redux";
import { addGasSpecies } from "../actions";

function AddGasSpecies(props) {

    const [state, setState] = useState({ name: "" });

    const updateInput = input => {
        setState({ input });
    };

    const handleAddGasSpecies = () => {
        console.log("Adding species: ", state);
        props.addGasSpecies(state);
        setState({ name: "" });
    };

    return (
        <div>
            <input
                type="text" class="form-control mb-2"
                onChange={e => updateInput({ name: e.target.value })}
                value={state.name}
            />
            <button className="btn btn-primary mb-2 add-gas-species" onClick={handleAddGasSpecies}>
                Add Species
            </button>
        </div>
    );
}

export default connect(null, { addGasSpecies })(AddGasSpecies);
