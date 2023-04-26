import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { getRunStatus } from "../redux/selectors";
import { RunStatus } from "../controllers/models";

const Download = props => {

  return(
    <Layout>
      <main role="main">
        <div className="container text-center">
          <p className="lead-muted p-2">
            Here you can download the full model configuration to use again in the future, and/or download the results from the last run. You can also use the downloaded configuration with the command-line version of MusicBox.
          </p>
          <section className="jumbotron text-center">
            <p>
              <button className="btn btn-secondary m-2" onClick={() => {console.error("Download config not implemented")}}>
                Download Configuration File
              </button>
              {props.runStatus === RunStatus.DONE ?
                <button className="btn btn-secondary m-2" onClick={() => {console.error("Download results not implemented")}}>
                  Download Results
                </button>
               : null}
            </p>
          </section>
        </div>
      </main>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    runStatus: getRunStatus(state)
  }
}

export default connect(mapStateToProps)(Download)
