import React from "react";
import { connect } from "react-redux";
import AddReaction from "./AddReaction";
import Reaction from "./Reaction";
import { getMechanism } from "../../redux/selectors";

function ReactionsList(props) {

  return (
    <nav className="bg-ncar-menu-secondary p-2">
      <AddReaction/>
      <ul className="list-group reactions-list">
        {props?.reactions?.map((reaction, index) => {
          return <Reaction 
            key={index}
            item={reaction}
            detailReactions={props.detailReactions}
            setDetailReactions={props.setDetailReactions} />;
        }
        )}
      </ul>
    </nav>
  );
}

const mapStateToProps = state => {
  const mechanism = getMechanism(state);
  return mechanism;
}

export default connect(mapStateToProps)(ReactionsList);
