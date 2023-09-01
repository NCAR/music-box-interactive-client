import React from "react";
import { connect } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";

import AddSpecies from "./AddSpecies";
import AddReaction from "./AddReaction";
import Species from "./Species";
import { getMechanism } from "../../redux/selectors";

const AddItemComponent = (props) => {
  const { type } = props;

  switch(type) {
    case "reactions":
      return (
        <AddReaction />
      );
    case "gas":
    case "aerosol":
      return (
        <AddSpecies type={type} />
      );
    default:
      return (
        <p>
          {`Unknown type ${type} in List`}
        </p>
      )
  }
}

function SpeciesList(props) {
  const { type, objects } = props;
  return (
    <Container fluid className="bg-ncar-menu-secondary p-2">
      <AddItemComponent type={type} />
      <ListGroup className="species-list">
        {objects.map((elem, index) => (
          <Species
            type={props.type}
            key={index}
            species={elem}
            detailSpecies={props.detailSpecies}
            setDetailSpecies={props.setDetailSpecies}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state, { type }) => {
  const mechanism = getMechanism(state);

  objects = [];
  switch(type) {
    case "gas":
      objects = props.gasSpecies;
      break;
    case "aerosol":
      objects = props.aerosolSpecies;
      break;
    case "reactions":
      objectsj = props.reactions;
      break;
    default:
      console.warn(`Unknown type ${type} in List`);
  }

  return mechanism;
};

export default connect(mapStateToProps)(SpeciesList);