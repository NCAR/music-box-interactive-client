import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addReactant } from "../redux/actions";
import { getSpeciesNames } from "../redux/selectors";

const Reactant = (props) => {
  const reactant = props.reactant;

  const handleChangeSpecies = (e) => {
    props.addReactant({
      reactionId: props.reactionId,
      reactant: {
        ...reactant,
        name: e.target.innerHTML
      }
    });
  };

  const handleChangeQty = (e) => {
    props.addReactant({
      reactionId: props.reactionId,
      reactant: {
        ...reactant,
        qty: parseInt(e.target.value)
      }
    });
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" className="btn btn-primary">
          {reactant.name && reactant.name.length ? reactant.name : "<none>"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {props.speciesNames.map(speciesName => {
            return (
              <Dropdown.Item href="#" key={speciesName} onClick={handleChangeSpecies}>
                {speciesName}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <div className="input-group mb-3" property="qty" data-type="int">
        <div className="input-group-prepend">
          <span className="input-group-text">qty</span>
        </div>
        <input type="text"
               className="form-control"
               defaultValue={reactant.qty}
               onBlur={handleChangeQty}>
        </input>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  console.log("updating species names", getSpeciesNames(state));
  return { speciesNames: getSpeciesNames(state) };
}

export default connect(mapStateToProps, { addReactant })(Reactant);
