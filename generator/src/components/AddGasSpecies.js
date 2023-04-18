import React, { useState } from "react";
import { connect } from "react-redux";
import { addGasSpecies } from "../redux/actions";

function AddGasSpecies(props) {

    const [state, setState] = useState("");

    const updateInput = input => {
        setState(input);
    };

    const handleAddGasSpecies = () => {
        props.addGasSpecies({ name: state, properties: [ ] });
        setState("");
    };

    return (
        <div>
            <input
                type="text" className="form-control mb-2"
                onChange={e => updateInput(e.target.value)}
                value={state}
            />
            <button className="btn btn-primary mb-2 add-gas-species" onClick={handleAddGasSpecies}>
                Add Species
            </button>
        </div>
    );
}

export default connect(null, { addGasSpecies })(AddGasSpecies);
