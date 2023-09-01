import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";

import SpeciesList from "./SpeciesList";
import SpeciesDetail from "./SpeciesDetail.js";

function SpeciesTab({ type }) {
  const [details, setDetails] = useState({});

  return (
    <>
      <p className="lead-muted p-2">
        Select a chemical species from the list to view/edit its properties, or add a new chemical species to the mechansim.
        The chemical species you add here will be available to participate in <Link to="mechanism/reactions">reactions</Link> 
        &nbsp;and can be include in the <Link to="conditions">model conditions</Link>.
      </p>
      <Container fluid className="p-2 d-flex flex-column overflow-hidden">
        <Row className="flex-grow-1 overflow-hidden">
          <Col md={4} lg={4} className="mh-100 overflow-auto">
            <Row className="flex-shrink-0">
              <Col>
                <SpeciesList
                  type={type}
                  details={details}
                  setDetails={setDetails}
                />
              </Col>
            </Row>
          </Col>
          <Col className="mh-100 overflow-auto">
            <Row className="flex-shrink-0">
              <Col className="species-detail">
                {Object.keys(details).map(key => (
                  <SpeciesDetail
                    type={type}
                    species={details[key]}
                    key={key}
                    details={details}
                    setDetails={setDetails}
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
