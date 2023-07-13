import React from "react";
import logo from "../assets/ncarucar-seal-final-gray.png"
import { Navbar, Nav } from "react-bootstrap";
import * as styles from "../styles/layout.module.css"
import DocumentMeta from "react-document-meta"
import { useDispatch, connect } from 'react-redux';
import { Link } from "gatsby"
import { doRun } from '../redux/actions';
import { showCookieBanner, hideCookieBanner } from '../redux/actions';
import { navigate, graphql, StaticQuery } from 'gatsby';
import { getMechanism,
         getAllConditions,
         getEvolvingTable,
         getRunStatus } from "../redux/selectors";
import { RunStatus } from "../controllers/models"
import utils from "../redux/utils"

function Layout(props) {
    const activeColor = { color: "#00797C" }
    const dispatch = useDispatch();

    const handleClick = () => {
        if (props.runStatus !== RunStatus.RUNNING) {
            const content = {
                status: "RUNNING",
                error: ""
            }
            dispatch({ type: utils.action_types.UPDATE_RUN_STATUS, payload: { content } })
            dispatch(doRun(props.mechanism, props.conditions));
            navigate("/results");
        }
    }

    return (
        <StaticQuery
            query={graphql`
            query HeadingQuery {
                site {
                    siteMetadata {
                        title
                        version
                    }
                }
            }
        `}
            render={data => (

                <DocumentMeta {...{
                    title: `${data.site.siteMetadata.title} ${data.site.siteMetadata.version}`,
                    meta: {
                        charset: "UTF-8",
                        name: "viewport",
                        content: "idth=device-width, initial-scale=1"
                    }
                }}>
                    <div className={styles.dashboard}>
                        <Navbar className="shadow p-0 sticky-top flex-md-nowrap" bg="dark" variant="dark">
                            <Navbar.Brand className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
                                href="/home">{data.site.siteMetadata.title}</Navbar.Brand>
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
                                    <small className="nav-section">ANALYSIS</small>
                                    <Link className="nav-link" to="/plots" activeStyle={activeColor}>
                                        <span className="oi oi-graph oi-prefix"></span>
                                        Plot Results
                                    </Link>
                                    <Link className="nav-link" to="/flow_diagram" activeStyle={activeColor}>
                                        <span className="oi oi-fork oi-prefix"></span>
                                        Flow Diagram
                                    </Link>
                                    <Link className="nav-link" to="/d3_flow" activeStyle={activeColor}>
                                        <span className="oi oi-fork oi-prefix"></span>
                                        d3_flow
                                    </Link>
                                    <Link className="nav-link" to="/downloads" activeStyle={activeColor}>
                                        <span className="oi oi-data-transfer-download oi-prefix"></span>
                                        Download
                                    </Link>
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
                                            <a className="footer-link" href="https://github.com/NCAR/music-box-interactive-client/issues/new?template=bug_report.md"><h5>Report a bug</h5></a>
                                        </div>
                                    </div>
                                </div>
                                {props.cookieBannerVisible && (
                                    <div className={styles.consentBanner}>
                                        <p>
                                        UCAR uses cookies to make our website function; however, UCAR cookies do not collect personal information about you.
                                        When using our website, you may encounter embedded content, such as YouTube videos and other social media links, that use their own cookies.
                                        To learn more about third-party cookies on this website, and to set your cookie preferences,&nbsp;
                                        <a href="https://www.ucar.edu/cookie-other-tracking-technologies-notice" target="_blank" rel="noopener noreferrer">
                                            click here
                                        </a>
                                        .
                                        </p>
                                        <button onClick={props.hideCookieBanner}>Accept</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </DocumentMeta>
            )}
        />
    )
}

const mapStateToProps = state => {
    const mechanism = {...getMechanism(state)};
    const conditions = {...getAllConditions(state)};
    const evolving = getEvolvingTable(state);
    conditions.evolving = evolving;
    return {
        mechanism: mechanism,
        conditions: conditions,
        runStatus: getRunStatus(state),
        cookieBannerVisible: state.cookies.cookieBannerVisible,
    };
};

export default connect(mapStateToProps, { showCookieBanner, hideCookieBanner })(Layout);