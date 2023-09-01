import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropertyList from "./PropertyList";

const SpeciesDetail = ({ type, species, details, setDetails }) => {
  const handleClick = (e) => {
    e.preventDefault();
    let newDetailSpecies = { ...details };
    delete newDetailSpecies[species.name];
    setDetails(newDetailSpecies);
  };

  return (
    <Card className="mb-4 species-card shadow-sm">
      <Card.Header>
        <h4 className="my-0 fw-normal">{species.name}</h4>
      </Card.Header>
      <Card.Body>
        <PropertyList type={type} species={species} speciesName={species.name} properties={species.properties} />
        <div className="container text-center mt-3">
          <Button variant="secondary" className="btn-cancel" onClick={handleClick}>
            Close
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SpeciesDetail;
