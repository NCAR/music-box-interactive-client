import React, { useState } from "react";
import { connect } from "react-redux";

function ReactionsTab(props) {

  const [ detailReactions, setDetailReactions ] = useState({ });

  return (
    <div id="reaction-content" className="container-fluid p-2 d-flex flex-column vh-100 overflow-hidden">
      <div className="row flex-grow-1 overflow-hidden">
        <div className="col-md-4 col-lg-4 mh-100 overflow-auto">
          <div className="row flex-shrink-0">
            <div className="col">
              Species List
            </div>
          </div>
        </div>
        <div className="col mh-100 overflow-auto">
          <div className="row flex-shrink-0">
            <div className="col reaction-detail">
              Reaction details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(ReactionsTab);
