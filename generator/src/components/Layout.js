import React from "react";
import logo from "../assets/ncarucar-seal-final-gray.png"
import { Navbar, Nav } from "react-bootstrap";
import * as styles from "../styles/layout.module.css"
import DocumentMeta from "react-document-meta"
import { useDispatch, connect } from 'react-redux';
import { Link } from "gatsby"
import { doRun } from '../redux/actions';
import { getMechanismAsObject } from "../redux/selectors";
import { navigate } from 'gatsby';

function Layout(props) {
    const activeColor = { color: "#000080" }
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(doRun(props.mechanism));
        navigate("/results");
    }

    const meta = {
        title: "MusicBox",
        meta: {
            charset: "UTF-8",
            name: "viewport",
            content: "idth=device-width, initial-scale=1"
        }
    }

    return (
        <DocumentMeta {...meta}>
            <div className={styles.dashboard}>
                <Navbar className="shadow p-0 sticky-top flex-md-nowrap" bg="dark" variant="dark">
                    <Navbar.Brand className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
                                  href="/home">MusicBox</Navbar.Brand>
                </Navbar>
                <div className={styles.content}>
                    <div className={styles.menu}>
                        <Nav className="flex-column pt-3">
                            <small className="nav-section">SETUP</small>
                            <Link className="nav-link" to="/getting_started" activeStyle={activeColor}>
                                <span className="oi oi-signpost oi-prefix"></span>
                                Start Here
                            </Link>
                            <Link className="nav-link" to="/mechanism" activeStyle={activeColor}>
                                <span className="oi oi-random oi-prefix"></span>
                                Mechanism
                            </Link>
                            <Link className="nav-link" to="/conditions" activeStyle={activeColor}>
                                <span className="oi oi-dashboard oi-prefix"></span>
                                Conditions
                            </Link>
                            <div className="pt-1 pb-3 mx-0 my-2" style={{ borderTop: '1px solid gray', borderBottom: '1px solid gray' }}>
                                <small className="nav-section">RUN</small>
                                <div style={{ textAlign: 'center' }}>
                                    <button id="run-model" style={{ margin: 'auto' }} className="btn btn-primary btn-ncar-active" onClick={handleClick}>Run Model</button>
                                </div>
                            </div>
                        </Nav>
                        <div className="mt-auto mb-4">
                            <img id="logo" className="img-fluid p-2" alt="" src={logo} />
                        </div>
                    </div>
                    <div className={styles.main}>
                        {props.children}
                        <div className={styles.footer}>
                            <div className="row justify-content-around">
                                <div className="col-md offset-md-1">
                                    <a className="footer-link" href="/home#behind-the-music"><h5>About</h5></a>
                                    <ul className="list-unstyled text-small">
                                        <a className="footer-link" href="/home#collaborators"><li>Collaborators</li></a>
                                        <a className="footer-link" href="/home#sponsors"><li>Sponsors</li></a>
                                        <a className="footer-link" href="/home#contact"><li>Contact us</li></a>

                                    </ul>
                                </div>
                                <div className="col-md">
                                    <a className="footer-link" href="/getting_started#how-to-use"><h5>How to use</h5></a>
                                </div>
                                <div className="col-md">
                                    <a className="footer-link" href="/home#report-a-bug"><h5>Report a bug</h5></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    )
}

const mapStateToProps = state => {
    const mechanism = getMechanismAsObject(state);
    return mechanism;
};

export default connect(mapStateToProps)(Layout);
