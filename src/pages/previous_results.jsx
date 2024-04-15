import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/PreviousResults/Card";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import utils from "../redux/utils";
import { resetAll, resetPlots } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { RunStatus } from "../controllers/models";

export default function PreviousResults() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    (async () => {
      const files = await window.electron.getPrevResults();
      setFiles(files);
    })();
  }, []);

  const handleCardClick = async (file) => {
    const content = {
      status: "RUNNING",
      error: "",
    };
    dispatch(resetPlots());
    dispatch({
      type: utils.action_types.UPDATE_RUN_STATUS,
      payload: { content },
    });

    // Load the results from the file
    const boxModelOutput = await window.electron.loadResultsFromFile(file);

    dispatch({
      type: utils.action_types.UPDATE_RUN_STATUS,
      payload: { content: { status: RunStatus['DONE'], error: {} } },
    });
    dispatch({
      type: utils.action_types.RESULTS_LOADED,
      payload: { content: boxModelOutput },
    });
    navigate("/results");
  };

  return (
    <Layout>
      <main role="main" style={{ padding: `4em` }}>
        <ListGroup
          className="bg-ncar-menu-secondary p-2 text-center"
          style={{ height: `100%` }}
        >
          <h2 className="p-3">Previous Results</h2>
          {files.map((file, index) => (
            <Card key={index} title={file} onClick={() => handleCardClick(file)}/>
          ))}
        </ListGroup>
      </main>
    </Layout>
  );
}