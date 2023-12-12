import React from "react"
import { connect } from "react-redux"
import { ListGroup } from "react-bootstrap"

function FlowPanel(props) {
  return (
    <ListGroup className="bg-ncar-menu-secondary p-2" style={{ height: `100%` }}>
      Flow Diagram Options
    </ListGroup>
  )
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(FlowPanel)