import React from "react";
import { connect } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";

import AddSpecies from "./AddSpecies";
import Species from "./Species";
import { getMechanism } from "../../redux/selectors";

function SpeciesList(props) {
  const species = props.type == "gas" ? props.gasSpecies : props.type == "aerosol" ? props.aerosolSpecies : [];
  return (
    <Container fluid className="bg-ncar-menu-secondary p-2">
      <AddSpecies type={props.type} />
      <ListGroup className="species-list">
        {species.map((spec, index) => (
          <Species
            type={props.type}
            key={index}
            species={spec}
            details={props.details}
            setDetails={props.setDetails}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(SpeciesList);