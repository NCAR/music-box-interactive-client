import React from "react"
import { connect } from 'react-redux'
import { basicConfigSchema } from "../../redux/schemas";
import { getConditions } from "../../redux/selectors";
import BasicConfigProperty from "./BasicConfigProperty";

function BasicConfiguration(props) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card mb-4 model-options-card shadow-sm">
              <div className="card-header">
                <h4 className="my-0 fw-normal">Basic Configuration</h4>
              </div>
              <div className="bg-ncar-body p-3">
                <input type="hidden" />
                {basicConfigSchema.map((param, index) => {
                  return <BasicConfigProperty key={`config-${index}`}
                                              data={props.data}
                                              schema={param} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return { data: getConditions(state, { classKey: "basic" }) }
}

export default connect(mapStateToProps)(BasicConfiguration)
