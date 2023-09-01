import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ReactionDetail from "./ReactionDetail";
import ReactionsList from "./ReactionsList";

function ReactionsTab() {
  const [details, setDetails] = useState({});

  return (
    <>
      <p className="lead-muted p-2">
        Select a reaction from the list to view/edit its properties, or add a new reaction to the mechanism.
        The chemical species available to participate in reactions can be modified{" "}
        <Link to="mechanism/species">here</Link>.
      </p>
      <Container fluid className="p-2 d-flex flex-column vh-100 overflow-hidden">
        <Row className="flex-grow-1 overflow-hidden">
          <Col md={4} lg={4} className="mh-100 overflow-auto">
            <Row className="flex-shrink-0">
              <Col>
                <ReactionsList
                  details={details}
                  setDetails={setDetails}
                />
              </Col>
            </Row>
          </Col>
          <Col className="mh-100 overflow-auto">
            <Row className="flex-shrink-0">
              <Col className="reaction-detail">
                {Object.keys(details).map((key) => {
                  return (
                    <ReactionDetail
                      reactionId={details[key].id}
                      key={key}
                      details={details}
                      setDetails={setDetails}
                    />
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default connect()(ReactionsTab);
