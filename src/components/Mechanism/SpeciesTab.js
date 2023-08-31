import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import SpeciesInstruction from "./SpeciesInstruction.js";
import SpeciesList from "./SpeciesList";
import AddSpecies from "./AddSpecies";
import Species from "./Species";
import SpeciesDetail from "./SpeciesDetail.js";
import PropertyList from "./PropertyList";

function SpeciesTab({ speciesType, species }) {
  const [detailSpecies, setDetailSpecies] = useState({});

  return (
    <>
      <SpeciesInstruction />
      <Container fluid className="p-2 d-flex flex-column overflow-hidden">
        <Row className="flex-grow-1 overflow-hidden">
          <Col md={4} lg={4} className="mh-100 overflow-auto">
            <Row className="flex-shrink-0">
              <Col>
                <SpeciesList
                  species={species}
                  detailSpecies={detailSpecies}
                  setDetailSpecies={setDetailSpecies}
                  addSpeciesComponent={() => <AddSpecies type={speciesType} />}
                  speciesComponent={(specCompProps) => <Species {...specCompProps} type={speciesType} />}
                />
              </Col>
            </Row>
          </Col>
          <Col className="mh-100 overflow-auto">
            <Row className="flex-shrink-0">
              <Col className="species-detail">
                {Object.keys(detailSpecies).map(key => (
                  <SpeciesDetail
                    species={detailSpecies[key]}
                    key={key}
                    detailSpecies={detailSpecies}
                    setDetailSpecies={setDetailSpecies}
                    propertyListComponent={(propListProps)  => <PropertyList
                        {...propListProps}
                        type={speciesType}
                      />}
                  />
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default connect()(SpeciesTab);
