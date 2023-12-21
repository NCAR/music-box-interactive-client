import React, { useState } from "react";
import { Navbar, Button, Row, Col } from "react-bootstrap";
import * as styles from "../styles/layout.module.css";
import { Helmet } from "react-helmet-async";
import { useDispatch, connect } from "react-redux";
import { hideCookieBanner } from "../redux/actions";
import {
  getMechanism,
  getAllConditions,
  getEvolvingTable,
  getRunStatus,
  getShowCookieBanner,
} from "../redux/selectors";
import { useNavigate } from "react-router-dom";
import { useVeiwPort } from "../hooks/useVeiwPort";
import SideNavBar from "./SideNavBar";

function Layout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // you can change breakPoint aligned with your design
  const { isOpen: menuIsOpen, setIsOpen: setMenuIsOpen } = useVeiwPort({
    breakPoint: 836,
  });

  const title = `MusicBox ${process.env.VITE_APP_VERSION}`;

  return (
    <>
      <Helmet>
        <title>{props.title || title}</title>
      </Helmet>
      <div className={`navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow ${styles.header}`}>
        <Navbar
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand
            className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
            href="/"
          >
            {title}
          </Navbar.Brand>
        </Navbar>
        <Button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Button>
      </div>
      <div className={`container-fluid ${styles.dashboard}`}>
        <Row>
          <SideNavBar />
          <Col className={`col-md-9 ms-sm-auto col-lg-10 px-0 ${styles.main}`}>
            {props.children}
            <div className={styles.footer}>
              <Row className="justify-content-around">
                <Col className="col-md offset-md-1">
                  <a className="footer-link" href="/#behind-the-music">
                    <h5>About</h5>
                  </a>
                  <ul className="list-unstyled text-small">
                    <a className="footer-link" href="/#collaborators">
                      <li>Collaborators</li>
                    </a>
                    <a className="footer-link" href="/#sponsors">
                      <li>Sponsors</li>
                    </a>
                    <a className="footer-link" href="/#contact">
                      <li>Contact us</li>
                    </a>
                  </ul>
                </Col>
                <Col className="col-md">
                  <a className="footer-link" href="/getting_started#how-to-use">
                    <h5>How to use</h5>
                  </a>
                </Col>
                <Col className="col-md">
                  <a
                    className="footer-link"
                    href="https://github.com/NCAR/music-box-interactive-client/issues/new?template=bug_report.md"
                  >
                    <h5>Report a bug</h5>
                  </a>
                </Col>
              </Row>
            </div>
            {props.cookieBannerVisible && (
              <div className={styles.consentBanner}>
                <p>
                  UCAR uses cookies to make our website function; however, UCAR
                  cookies do not collect personal information about you. When
                  using our website, you may encounter embedded content, such as
                  YouTube videos and other social media links, that use their
                  own cookies. To learn more about third-party cookies on this
                  website, and to set your cookie preferences,&nbsp;
                  <a
                    href="https://www.ucar.edu/cookie-other-tracking-technologies-notice"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click here
                  </a>
                  .
                </p>
                <button onClick={props.hideCookieBanner}>Accept</button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const mechanism = { ...getMechanism(state) };
  const conditions = { ...getAllConditions(state) };
  const evolving = getEvolvingTable(state);
  conditions.evolving = evolving;
  return {
    mechanism: mechanism,
    conditions: conditions,
    runStatus: getRunStatus(state),
    cookieBannerVisible: getShowCookieBanner(state),
  };
};

export default connect(mapStateToProps, { hideCookieBanner })(Layout);
