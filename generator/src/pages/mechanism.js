import React, {useState} from "react";
import { connect } from 'react-redux';
import { Link } from "gatsby";
import Layout from "../components/Layout";
import utils from"../utils";
import { changeReactionType } from '../actions'
import MyForm from "../components/forms/basicForm";
import BoxLayout from "../components/forms/boxLayout";
import GenericForm from "../components/forms/genericForm";
import SaveButton from "../components/SaveButton"
import CancelButton from "../components/CancelButton"

function Mechanism(props) {
  const SPECIES = 0
  const REACTIONS = 1
  const type = props.state.reactionType;
  const [param, setParam] = useState(SPECIES)

  const typeSelected = "btn btn-primary btn-lg rounded-0"
  const typeNotSelected = "btn btn-secondary btn-lg rounded-0"
  const paramSelected = "btn btn-primary rounded-0"
  const paramNotSelected = "btn btn-secondary rounded-0"
  
  const aerosolClickHandler = () => {
    props.changeReactionType(utils.reaction_types.AEROSOL)
    setParam(SPECIES)
  }

  const gasClickhandler = () => {
    props.changeReactionType(utils.reaction_types.GAS)
  }
  
  console.log(props)

  return (
    <Layout>
        <main role="main">
          <br />
          <div className="container text-left mx-5">
            <div className="pt-3">
              <button className={type === utils.reaction_types.GAS ?  typeSelected : typeNotSelected} onClick={ gasClickhandler }>Gas</button>
              <button className={type === utils.reaction_types.AEROSOL ? typeSelected : typeNotSelected} onClick={ aerosolClickHandler }>Aerosol</button>
            </div>
          </div>
          
          <div className="container text-center">
            <div className="pt-3">
              <button className={param === SPECIES ?  paramSelected : paramNotSelected} onClick={() => setParam(SPECIES)}>
                Chemical Species
              </button>
              {type === utils.reaction_types.GAS ? <button className={param === REACTIONS ? paramSelected : paramNotSelected} onClick={() => setParam(REACTIONS)}>Reactions</button> : null}
            </div>
          </div>

          {
            param === SPECIES ? <p className="lead-muted p-2">Select a chemical species from the list to view/edit its properties, or add a new chemical species to the mechansim. The chemical species you add here will be available to participate in <Link to="mechanism/reactions">reactions</Link> and can be include in the <Link to="conditions">model conditions</Link>.</p> : null
          }
          
          {param === SPECIES ? <SpeciesList /> : <ReactionsList />}
        </main>
    </Layout>
  )
}

function Form1() {
  const fields = [
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'tolerance', label: 'Absolute Convergence Tolerance', type: 'number' },
    { name: 'molecularWeight', label: 'Molecular Weight', type: 'number' },
    { name: 'fixedConcentration', label: 'Fixed Concentration', type: 'number' },
    { name: 'density', label: 'Density', type: 'number' },
    { name: 'kappa', label: 'Kappa', type: 'number' },
  ];

  return (
    <div>
      <h1></h1>
      <GenericForm fields={fields} />
    </div>
  );
}

function SpeciesList() {
  return (
    <div id="species_content" className="container-fluid p-2 d-flex flex-column vh-100 overflow-hidden">
      <div className="row flex-grow-1 overflow-hidden">
        <div className="col-md-4 col-lg-4 mh-100 overflow-auto">
          <div className="row flex-shrink-0">
            <div className="col">
              <nav className="bg-ncar-menu-secondary p-2">
                <button className="btn btn-primary species-new mb-2">
                  Add species
                </button>
                <div className="input-group">
                  <select name="grid" savebutton="optionsSave" className="form-control" id="id_grid">
                    <option value="box">PartMC</option>
                  </select>
                </div>
                <ul className="list-group species-list" id="species_list">
                  {null}
                </ul>
              </nav>    
            </div> 
            <div className="col">
            <div className="card mb-4 model-options-card shadow-sm">
              <div className="card-header">
                <h4 className="my-0 fw-normal">PartMC</h4>
              </div>

              <div className="bg-ncar-body p-3">
                <Form1/>
                <div className="container text-center mt-3">
                  <SaveButton />
                  <CancelButton />
                </div>
              </div>
            </div>
          </div>  
          </div>   
        </div>
      </div>
    </div>
  )
}

function Form2() {
  const fields = [
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'tolerance', label: 'Absolute Convergence Tolerance', type: 'number' },
    { name: 'molecularWeight', label: 'Molecular Weight', type: 'number' },
    { name: 'fixedConcentration', label: 'Fixed Concentration', type: 'number' },
  ];

  return (
    <div>
      <h1>PartMC</h1>
      <GenericForm fields={fields} />
    </div>
  );
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

function Species() {
  return (
    <div>
      Place Holder
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