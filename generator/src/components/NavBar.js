import React from "react";
import logo from "../assets/ncarucar-seal-final-gray.png"

export default function NavBar() {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-ncar-menu sidebar collapse">
          <div className="position-sticky pt-3">
            <div id="main-nav" className="nav flex-column pt-2">
              <small className="nav-section">SETUP</small>
              <a className="nav-link {% if '/getting_started' in request.path %}active{% endif %}" aria-current="{% if '/getting_started' in request.path %}page{% endif %}" href="/getting_started">
                <span className="oi oi-signpost oi-prefix"></span>Start Here
              </a>
              <a className="nav-link {% if '/mechanism' in request.path %}active{% endif %}" aria-current="{% if '/mechanism' in request.path %}page{% endif %}" href="/mechanism">
                <span className="oi oi-random oi-prefix"></span>Mechanism
              </a>
              <a className="nav-link {% if '/conditions' in request.path %}active{% endif %}" aria-current="{% if '/conditions' in request.path %}page{% endif %}" href="/conditions">
                <span className="oi oi-dashboard oi-prefix"></span>Conditions</a>
              <div className="pt-1 pb-3 mx-0 my-2" style={{borderTop: '1px solid gray', borderBottom: '1px solid gray'}}>
                <small className="nav-section">RUN</small>
                <div style={{textAlign:'center'}}>
                  <button id="run-model" style={{margin: 'auto'}} className="btn btn-primary btn-ncar-active">Run Model</button>
                </div>
              </div>
              <div id="post-run-links">
              </div>
            </div>
          </div>
          <div className="mt-auto mb-4" style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <img id="logo" className="img-fluid p-2" alt="" src={logo} />
          </div>
        </nav>
    )
}
