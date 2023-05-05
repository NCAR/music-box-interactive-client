import React from "react"
import { connect } from "react-redux"
import { ThreeCircles } from 'react-loader-spinner'
import { Container, Alert } from 'react-bootstrap'
import Layout from "../components/Layout"
import { getRunStatus, getLastError } from '../redux/selectors'
import { RunStatus } from '../controllers/models'

export const ResultsRunning = () => {
  return (
    <div style={{display: `flex`, justifyContent: `center`, margin: `auto`}}>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  )
}

export const ResultsDone = () => {
  return (
    <>
      <h1>Your simulation is finished!</h1>
      <p>
        You can now plot your results or download them for offline analysis.
      </p>
    </>
  )
}

export const ResultsError = props => {
  return (
    <>
      <h1>You have encountered an error</h1>
      <Alert variant='danger'>
        props.error.message
      </Alert>
    </>
  )
}

export const ResultsNotStarted = () => {
  return (
    <>
      <h1>To run a simulation, click the green Run button to the left</h1>
      <p>
        The possibilities are limitless.
      </p>
    </>
  )
}

const Results = (props) => {

  return (
    <Layout>
      <Container className="jumbotron text-center hero-img">
      {props.runStatus}
      {(() => {switch(props.runStatus) {
        case RunStatus.RUNNING:
          return <ResultsRunning />
        case RunStatus.DONE:
          return <ResultsDone />
        case RunStatus.ERROR:
          return <ResultsError errorMessage={props.errorMessage} />
        default:
          return <ResultsNotStarted />
      }})()}
      </Container>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    runStatus: getRunStatus(state),
    error: getLastError(state)
  }
}

export default connect(mapStateToProps)(Results)
