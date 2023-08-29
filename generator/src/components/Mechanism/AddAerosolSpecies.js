import React, { useState } from "react";
import { connect } from "react-redux";
import { addAerosolSpecies } from "../../redux/actions";

function AddAerosolSpecies(props) {

    const [state, setState] = useState("");

    const updateInput = input => {
        setState(input);
    };

    const handleAddAerosolSpecies = () => {
        props.addAerosolSpecies({ name: state, properties: [ ] });
        setState("");
    };

    return (
        <div>
            <input
                type="text" className="form-control mb-2"
                onChange={e => updateInput(e.target.value)}
                value={state}
            />
            <button className="btn btn-primary mb-2 add-gas-species" onClick={ handleAddAerosolSpecies }>
                Add Species
            </button>
        </div>
    );
}

export default connect(null, { addAerosolSpecies })(AddAerosolSpecies);
