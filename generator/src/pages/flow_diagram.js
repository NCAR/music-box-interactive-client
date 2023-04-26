import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { getRunStatus } from "../redux/selectors";
import { RunStatus } from "../controllers/models";

const FlowDiagram = props => {

  return (
    <Layout>
      <main role="main">
        <div className="container text-center">
          {props.runStatus === RunStatus.DONE ?
            <>
              Flow diagram
            </>
           :
            <p> The flow diagram will be available once a model run has been completed </p>
          }
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

export default connect(mapStateToProps)(FlowDiagram)

