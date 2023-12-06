import React, { useState } from "react";
import { connect } from "react-redux";
import { addAerosolSpecies, addGasSpecies } from "../../../redux/actions";

function AddSpecies(props) {
  const { type, addAction } = props;

  const [state, setState] = useState("");

  const updateInput = (input) => {
    setState(input);
  };

  const clickEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSpecies();
    }
  };

  const handleAddSpecies = () => {
    addAction({ name: state, properties: [] });
    setState("");
  };

  return (
    <div>
      <input
        type="text"
        className="form-control mb-2"
        onChange={(e) => updateInput(e.target.value)}
        value={state}
        onKeyDown={clickEnter}
      />
      <button
        className="btn btn-primary mb-2 add-gas-species"
        onClick={handleAddSpecies}
      >
        Add {type.charAt(0).toUpperCase() + type.slice(1)} Species
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { type } = ownProps;

  let action = null;

  switch (type) {
    case "aerosol":
      action = (species) => dispatch(addAerosolSpecies(species));
      break;
    case "gas":
      action = (species) => dispatch(addGasSpecies(species));
      break;
  }

  return {
    addAction: action,
  };
};

export default connect(null, mapDispatchToProps)(AddSpecies);
