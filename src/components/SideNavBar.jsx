import React from "react";
import { Nav } from "react-bootstrap";
import { doRun, resetPlots } from "../redux/actions";
import { NavLink } from "react-router-dom";
import logo from "../assets/ncarucar-seal-final-gray.png";
import { RunStatus } from "../controllers/models";
import utils from "../redux/utils";
import { connect } from "react-redux";
import * as styles from "../styles/layout.module.css";

const SideNavBar = () => {

  const featureFlags = JSON.parse(import.meta.env.VITE_FEATURE_FLAGS || "{}");

  const handleClick = () => {
    if (props.runStatus !== RunStatus.RUNNING) {
      const content = {
        status: "RUNNING",
        error: "",
      };
      dispatch(resetPlots());
      dispatch({
        type: utils.action_types.UPDATE_RUN_STATUS,
        payload: { content },
      });
      dispatch(doRun(props.mechanism, props.conditions));
      navigate("/results");
    }
  };

  return (
    <Nav id="sidebarMenu" className={`flex-column pt-5 col-md-3 col-lg-2 d-md-block menu collapse ${styles.menu}`}>
      <div className="container-fluid">
        <small className="nav-section">SETUP</small>
        <NavLink
          to="/getting_started"
          className={({ isActive }) =>
            ["nav-link", isActive ? "active" : ""].join(" ")
          }
        >
          <span className="oi oi-signpost oi-prefix"></span>
          Start Here
        </NavLink>
        <NavLink
          to="/mechanism"
          className={({ isActive }) =>
            ["nav-link", isActive ? "active" : ""].join(" ")
          }
        >
          <span className="oi oi-random oi-prefix"></span>
          Mechanism
        </NavLink>
        <NavLink
          to="/conditions"
          className={({ isActive }) =>
            ["nav-link", isActive ? "active" : ""].join(" ")
          }
        >
          <span className="oi oi-dashboard oi-prefix"></span>
          Conditions
        </NavLink>
        <div
          className="pt-1 pb-3 mx-0 my-2"
          style={{
            borderTop: "1px solid gray",
            borderBottom: "1px solid gray",
          }}
        >
          <small className="nav-section">RUN</small>
          <div style={{ textAlign: "center" }}>
            <button
              id="run-model"
              style={{ margin: "auto" }}
              className="btn btn-primary btn-ncar-active"
              onClick={handleClick}
            >
              Run Model
            </button>
          </div>
        </div>
        <small className="nav-section">ANALYSIS</small>
        <NavLink
          to="/plots"
          className={({ isActive }) =>
            ["nav-link", isActive ? "active" : ""].join(" ")
          }
        >
          <span className="oi oi-graph oi-prefix"></span>
          Plot Results
        </NavLink>
        {featureFlags.FLOW_DIAGRAM && (
          <>
            <NavLink
              to="/flow_diagram"
              className={({ isActive }) =>
                ["nav-link", isActive ? "active" : ""].join(" ")
              }
            >
              <span className="oi oi-fork oi-prefix"></span>
              Flow Diagram
            </NavLink>
          </>
        )}
        <NavLink
          to="/downloads"
          className={({ isActive }) =>
            ["nav-link", isActive ? "active" : ""].join(" ")
          }
        >
          <span className="oi oi-data-transfer-download oi-prefix"></span>
          Download
        </NavLink>
        <div className="mt-auto mb-4">
          <img id="logo" className="img-fluid p-2" alt="" src={logo} />
        </div>
      </div>
    </Nav>
  );
}

export default connect()(SideNavBar);