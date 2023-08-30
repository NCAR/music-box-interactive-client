import React from "react";
import { connect } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";

function SpeciesList(props) {
  console.log(props)
  const AddSpeciesComponent = props.addSpeciesComponent;
  const SpeciesComponent = props.speciesComponent;

  return (
    <Container fluid className="bg-ncar-menu-secondary p-2">
      <AddSpeciesComponent />
      <ListGroup className="species-list">
        {props?.species?.map((species, index) => (
          <SpeciesComponent
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
