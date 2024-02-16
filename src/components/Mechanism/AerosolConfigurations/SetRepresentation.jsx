import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import {SetAerosolRepresentation} from "../../../redux/actions";
import { Container, Button } from "react-bootstrap";
import {store} from "../../../redux/store/createStore.js"
import { getMechanism } from "../../../redux/selectors/mechanism.js";


function SetRepresentation(prop) {
    const {addAction} = prop;
  
    function handleSetConfig(config_name) {
        addAction(config_name);
    };
    const tabChoices = ["Modal", "Binned"]
    
  
    return (
    <Container fluid className="bg-ncar-menu-secondary p-5 mt-4 d-flex flex-column">
        {tabChoices.map((ele, index) => (
              <Button
                key={index}
                variant={ele === prop.aerosolRepresentation ? "primary" : "secondary"}
                className="mt-5 mb-5 mt-3"
                onClick={() => {
                    handleSetConfig(ele)
                }}
              >
                {ele}
            
              </Button>
            ))}
    </Container>
    );
  }
  
  const mapStateToProps = (state) => {
    return {
      aerosolRepresentation: getMechanism(state).aerosolRepresentationConfig,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    let action = (content) => {
        dispatch(SetAerosolRepresentation(content));
      };
    return {
      addAction: action,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SetRepresentation);

