import React from "react";
import { connect } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";

import AddSpecies from "./Species/AddSpecies";
import AddReaction from "./Reactions/AddReaction";
import Species from "./Species/Species";
import Reaction from "./Reaction";
import { getMechanism } from "../../redux/selectors";

const AddItemComponent = ({ type }) => {
  return type === "reactions" ? <AddReaction /> : <AddSpecies type={type} />;
};

const ItemComponent = ({ type, ...otherprops }) => {
  return type === "reactions" ? (
    <Reaction {...otherprops} />
  ) : (
    <Species type={type} {...otherprops} />
  );
};

function List({ type, objects, details, setDetails }) {
  return (
    <Container fluid className="bg-ncar-menu-secondary p-2">
      <AddItemComponent type={type} />
      <ListGroup className="species-list">
        {objects?.map((elem, index) => (
          <ItemComponent
            type={type}
            key={index}
            item={elem}
            details={details}
            setDetails={setDetails}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state, { type }) => {
  const mechanism = getMechanism(state);

  let objects = [];
  switch (type) {
    case "gas":
      objects = mechanism.gasSpecies;
      break;
    case "aerosol":
      objects = mechanism.aerosolSpecies;
      break;
    case "reactions":
      objects = mechanism.reactions;
      break;
    default:
      console.warn(`Unknown type ${type} in List`);
  }

  return {
    objects: objects,
  };
};

export default connect(mapStateToProps)(List);
