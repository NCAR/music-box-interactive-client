import React, {useState} from "react";
import { connect } from 'react-redux';
import { Link } from "gatsby";
import Layout from "../components/Layout";
import GasSpeciesTab from "../components/GasSpeciesTab.js";
import { changeReactionType } from '../actions'

function Mechanism(props) {
  const SPECIES = 0
  const REACTIONS = 1
  const [param, setParam] = useState(SPECIES)

  const paramSelected = "btn btn-primary btn-ncar-active"
  const paramNotSelected = "btn btn-secondary"

  return (
    <Layout>
        <main role="main">
          <div className="container text-center">
            <div className="pt-3">
              <button className={param === SPECIES ?  paramSelected : paramNotSelected} onClick={() => setParam(SPECIES)}>
                Gas Species
              </button>
              <button className={param === REACTIONS ? paramSelected : paramNotSelected} onClick={() => setParam(REACTIONS)}>Reactions</button>
            </div>
          </div>

          {
            param === SPECIES ? <p className="lead-muted p-2">Select a chemical species from the list to view/edit its properties, or add a new chemical species to the mechansim. The chemical species you add here will be available to participate in <Link to="mechanism/reactions">reactions</Link> and can be include in the <Link to="conditions">model conditions</Link>.</p> : null
          }
          {param === SPECIES ? <GasSpeciesTab /> : null}
          {param === REACTIONS ? <ReactionsList /> : null}
        </main>
    </Layout>
  )
}

// TODO: modify this according to mechanism/reaction; className not correct
function ReactionsList() {
  return (
    <div id="species_content" className="container-fluid p-2 d-flex flex-column vh-100 overflow-hidden">
      <div className="row flex-grow-1 overflow-hidden">
        <div className="col-md-4 col-lg-4 mh-100 overflow-auto">
          <div className="row flex-shrink-0">
            <div className="col">
              <nav className="bg-ncar-menu-secondary p-2">
                <button className="btn btn-primary species-new mb-2">
                  Add reactions
                </button>
                <ul className="list-group species-list" id="species_list">
                  {null}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeReactionType: (type) => dispatch(changeReactionType(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mechanism)
