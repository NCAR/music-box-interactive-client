import React, { useState } from "react";
import { connect } from "react-redux";
import SpeciesInstruction from "./SpeciesInstruction.js";
import { Container, Row, Col } from "react-bootstrap";

function SpeciesTab({ speciesType, SpeciesList, SpeciesDetail }) {
  const [detailSpecies, setDetailSpecies] = useState({});

  return (
    <>
      <SpeciesInstruction />
      <Container fluid className="p-2 d-flex flex-column overflow-hidden">
        <Row className="flex-grow-1 overflow-hidden">
          <Col md={4} lg={4} className="mh-100 overflow-auto">
            <Row className="flex-shrink-0">
              <Col>
                <SpeciesList detailSpecies={detailSpecies} setDetailSpecies={setDetailSpecies} />
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
