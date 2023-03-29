import React from "react"
import { connect } from 'react-redux'
import Layout from "../components/Layout"
import SaveButton from "../components/SaveButton"
import CancelButton from "../components/CancelButton"
import ComplexForm from "../components/forms/ComplexForm";


function Conditions(props) {

  console.log(props)

  return (
    <Layout>
        <div id="main">
          <p className="lead-muted p-2">
              Set general conditions for your simulation here, including how long a time you would like to simulate and how often output data are written. The chemistry time step determines the time step of the ODE solver. We recommend an output time step of 1/100 of the simulation time and a chemistry time step equal to the output time step as a first start.
          </p>
          <div className="container-fluid d-flex flex-column vh-100 overflow-hidden">
            <div className="row flex-grow-1 overflow-hidden mt-5">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
                <div className="col">
                <BasicConfiguration />
                </div>
                <div className="col">
                  <div className="card mb-4 model-options-card shadow-sm">
                    <div className="card-header">
                      <h4 className="my-0 fw-normal">PartMC</h4>
                    </div>

                    <div className="bg-ncar-body p-3">
                      <MyForm/>
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
    </Layout>
  )
}

function MyForm() {
  return (
    <ComplexForm
      fileLabel="Choose file to upload"
      numParticlesLabel="Total number of particles"
      fractalTreatmentLabel="Fractal treatment"
      heightProfileFileLabel="Height profile file"
      lossFunctionLabel="Loss function specification"
      doCoagulationLabel="Do coagulation"
      coagulationKernelOptionsLabel="Coagulation kernel options"
      doNucleationLabel="Do nucleation"
    />
  );
}

function BasicConfiguration() {
    const paramEntry = [
      {
        label: "Latitude",
        requirement: "[-90, 90]",
        unit: "degrees"
      },
      {
        label: "Longitude",
        requirement: "[-180, 180]",
        unit: "degrees"
      },
      {
        label: "Start Time",
        requirement: "[limit 24 hours]",
        unit: "hours"
      },
      {
        label: "Start Day",
        requirement: "[0, 365]",
        unit: "days"
      }
    ]
    
    const generateConfigEntries = () => {
      const res = []
      for (let i = 0; i < paramEntry.length;i++) {
        res.push(<ConfigEntry label={paramEntry[i].label} requirement={paramEntry[i].requirement} unit={paramEntry[i].unit} key={i}/>)
      }
      return res
    }

    const configEntries = generateConfigEntries()

    return (
      <div className="container">
            <div className="card mb-4 model-options-card shadow-sm">
              <div className="card-header">
                <h4 className="my-0 fw-normal">Basic Configuration</h4>
              </div>

              <div className="bg-ncar-body p-3">
                <input type="hidden" />
                {configEntries}

                <label> Select Model </label>
                <div className="input-group">
                  <select name="grid" savebutton="optionsSave" className="form-control" id="id_grid">
                    <option value="box">PartMC</option>
                  </select>
                </div>

                <div className="container text-center mt-3">
                  <SaveButton />
                  <CancelButton />
                </div>

              </div>
            </div>
      </div>
    )
}

function ConfigEntry(props) {
  return (
    <div>
      <label> {props.label} {props.requirement} </label>
      <div className="input-group">
        <div>
          <input type="text" name="chemistry_time_step" savebutton="optionsSave" className="form-control" required="" id="id_chemistry_time_step" />
        </div>  
        <div>
          <select name="chem_step.units" savebutton="optionsSave" className="form-control options-dropdown" unit="degrees" id="id_chem_step.units">
            <option>{props.unit}</option>
          </select>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ reactionType }) => {
  return {
    reactionType: reactionType
  }
}

// TODO
const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps)(Conditions)
