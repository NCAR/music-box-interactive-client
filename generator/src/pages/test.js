import React from "react";
import { connect } from 'react-redux'
import Layout from "../components/Layout"
import SaveButton from "../components/SaveButton"
import CancelButton from "../components/CancelButton"

export default function Test (props) {
 
    return (
        <Layout>
            <h1>This page merely serves as a test page, and will be deleted later</h1>
            {/* Place your component below this line*/}
       
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-left">
                  <div class="col">
                    <div class="card mb-4 shadow-sm">
                      <div class="card-header">
                        <h4 class="my-0 fw-normal">M</h4>
                      </div>
                      <div class="card-body">
                        <form>
                          <label style={{padding: "10px"}}>
                              <span style={{backgroundColor:"#a6a6a6", padding: "5px"}}>Description</span>
                              <input type="text" name="name" />
                          </label>
                          <br></br>
                          <label style={{padding: "10px"}}>
                          <span style={{backgroundColor:"#a6a6a6", padding: "5px"}}>Absolute Convergence Tolerance</span>
                              <input type="text" name="name" />
                          </label>
                          <br></br>
                          <label style={{padding: "10px"}}>
                          <span style={{backgroundColor:"#a6a6a6", padding: "5px"}}>Molecular Weight</span>
                              <input type="text" name="name" />
                          </label>
                          <br></br>
                          <label style={{padding: "10px"}}>
                          <span style={{backgroundColor:"#a6a6a6", padding: "5px"}}>Fixed Concentration</span>
                              <input type="text" name="name" />
                          </label>
                          <br></br>
                          <label style={{padding: "10px"}}>
                          <span style={{backgroundColor:"#a6a6a6", padding: "5px"}}>Density</span>
                              <input type="text" name="name" />
                          </label>
                          <br></br>
                          <label style={{padding: "10px"}}>
                          <span style={{backgroundColor:"#a6a6a6", padding: "5px"}}>Kappa</span>
                              <input type="text" name="name" />
                          </label>
                          <br></br>
                          <br></br>
                          <button id="optionsSave" className="btn btn-secondary mx-1" type="submit">Save</button>
                          <button className="btn btn-secondary mx-1" type="reset">Cancel</button>

                        </form>
                      </div>
                    </div>
                  </div> 
                  
                </div>

                <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card mb-4 model-options-card shadow-sm">
              <div className="card-header">
                <h4 className="my-0 fw-normal">Basic Configuration</h4>
              </div>

              <div className="bg-ncar-body p-3">
                <input type="hidden" />

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
        </div>
      </div>
               
  
            {/* Place your component above this line */}

        </Layout>
    )
}



