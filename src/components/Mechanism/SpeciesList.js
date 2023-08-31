import React from "react";
import { connect } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";
import AddSpecies from "./AddSpecies";
import Species from "./Species";

function SpeciesList(props) {
  return (
    <Container fluid className="bg-ncar-menu-secondary p-2">
      <AddSpecies type={props.speciesType} />
      <ListGroup className="species-list">
        {props?.species?.map((species, index) => (
          <Species
          speciesType={props.speciesType}
            key={index}
            species={species}
            detailSpecies={props.detailSpecies}
            setDetailSpecies={props.setDetailSpecies}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

export default connect()(SpeciesList);
