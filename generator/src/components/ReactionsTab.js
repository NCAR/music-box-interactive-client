import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "gatsby";
import ReactionsList from "./ReactionsList";

function ReactionsTab(props) {

  const [ detailReactions, setDetailReactions ] = useState({ });

  return (
    <>
      <p className="lead-muted p-2">Select a reaction from the list to view/edit its properties, or add a new reaction to the mechansim. The chemical species available to participate in reactions can be modified <Link to="mechanism/species">here</Link>.</p>
      <div id="reaction-content" className="container-fluid p-2 d-flex flex-column vh-100 overflow-hidden">
        <div className="row flex-grow-1 overflow-hidden">
          <div className="col-md-4 col-lg-4 mh-100 overflow-auto">
            <div className="row flex-shrink-0">
              <div className="col">
                <ReactionsList detailReactions={detailReactions}
                               setDetailReactions={setDetailReactions}/>
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
    </>
  );
}

export default connect()(ReactionsTab);
