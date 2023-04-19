import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addReaction } from "../redux/actions";
import reactionTypes from "../redux/reducers/reaction_types";

function AddReaction(props) {

  const handleAddReaction = (reaction) => {
    props.addReaction(reaction);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className="btn btn-primary">
        Add Reaction
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.entries(reactionTypes).map(([key, value]) => {
          return (
            <Dropdown.Item href="#" key={key} onClick={() => handleAddReaction(value)}>
              {value.__meta.label}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(null, { addReaction })(AddReaction);
