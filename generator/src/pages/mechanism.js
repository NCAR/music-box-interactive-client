import React, {useState} from "react"
import Layout from "../components/Layout"
import utils from"../utils"

export default function Mechanism() {
  
  // TODO: replace useState with Redux
  const SPECIES = 0
  const REACTIONS = 1
  const [type, setType] = useState(utils.types.GAS)
  const [param, setParam] = useState(SPECIES)

  const typeSelected = "btn btn-primary btn-lg rounded-0"
  const typeNotSelected = "btn btn-secondary btn-lg rounded-0"
  const paramSelected = "btn btn-primary rounded-0"
  const paramNotSelected = "btn btn-secondary rounded-0"
  
  const aerosolClickHandler = () => {
    setType(utils.types.AEROSOL)
    setParam(SPECIES)
  }

  return (
    <Layout>
        <main role="main">
          <br />
          <div className="container text-left mx-5">
            <div className="pt-3">
              <button className={type === utils.types.GAS ?  typeSelected : typeNotSelected} onClick={() => setType(utils.types.GAS)}>Gas</button>
              <button className={type === utils.types.AEROSOL ? typeSelected : typeNotSelected} onClick={aerosolClickHandler}>Aerosol</button>
            </div>
          </div>
          
          <div className="container text-center">
            <div className="pt-3">
              <button className={param === SPECIES ?  paramSelected : paramNotSelected} onClick={() => setParam(SPECIES)}>
                Chemical Species
              </button>
              {type === utils.types.GAS ? <button className={param === REACTIONS ? paramSelected : paramNotSelected} onClick={() => setParam(REACTIONS)}>Reactions</button> : null}
            </div>
          </div>

          {
            param === SPECIES ? <p className="lead-muted p-2">Select a chemical species from the list to view/edit its properties, or add a new chemical species to the mechansim. The chemical species you add here will be available to participate in <a href="mechanism/reactions">reactions</a> and can be include in the <a href="conditions">model conditions</a>.</p> : null
          }
          
          {param === SPECIES ? <SpeciesList /> : <ReactionsList />}

        </main>
    </Layout>
  )
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
