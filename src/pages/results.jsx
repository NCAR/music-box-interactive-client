import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Alert, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from "../components/Layout";
import { getRunStatus, getLastError, getCurrentModelTime, getSimulationTimeInSeconds } from "../redux/selectors";
import { RunStatus } from "../controllers/models";
import { useNavigate } from "react-router-dom";
import isElectron from "is-electron";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ResultsDone = () => {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSave = async (name) => {
    if (!name.trim()) {
      setModalMessage("Please enter a simulation name");
      setModalOpen(true);
      return;
    }

    try {
      await window.electron.saveResults(name);
      setModalMessage("Results saved successfully!");
    } catch (error) {
      setModalMessage("An error occurred while saving the results");
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();
  const { FLOW_DIAGRAM = false } = JSON.parse(import.meta.env.VITE_FEATURE_FLAGS || "{}");

  return (
    <>
      <h1>Your simulation is finished!</h1>
      <p>You can now plot your results or download them for offline analysis.</p>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/plots")}>
          Plots
        </Button>
        {FLOW_DIAGRAM && (
          <Button variant="contained" color="primary" onClick={() => navigate("/flow_diagram")}>
            Flow Diagram
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={() => navigate("/downloads")}>
          Download Results
        </Button>
      </div>
      {isElectron() && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em', paddingTop: '2em' }}>
          <TextField
            label="Enter simulation name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1, maxWidth: '600px' }}
          />
          <Button variant="contained" color="primary" onClick={() => handleSave(name)}>
            Save
          </Button>
        </div>
      )}
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <p>{modalMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ResultsError = (props) => {
  return (
    <>
      <h1>You have encountered an error</h1>
      <Alert variant="danger">{props.errorMessage}</Alert>
    </>
  );
};

const ResultsNotStarted = () => {
  return (
    <>
      <h1>To run a simulation, click the green Run button to the left</h1>
      <p>The possibilities are limitless.</p>
    </>
  );
};

const Results = ({ runStatus, error, currentModelTime, totalSimulationTime }) => {
  const progress = Math.round((currentModelTime / totalSimulationTime) * 100);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Container style={{ textAlign: 'center', padding: '2em' }}>
          {(() => {
            switch (runStatus) {
              case RunStatus.RUNNING:
                return <LinearProgressWithLabel value={progress} />
              case RunStatus.DONE:
                return <ResultsDone />;
              case RunStatus.ERROR:
                return <ResultsError errorMessage={error.message} />;
              case RunStatus.WAITING:
                return <ResultsNotStarted />;
              case RunStatus.NOT_FOUND:
                return <ResultsError errorMessage="Unexpected server error. Please try your run again." />;
              default:
                console.error(`Unknown model run status: ${runStatus}`);
                return <ResultsNotStarted />;
            }
          })()}
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    runStatus: getRunStatus(state),
    currentModelTime: getCurrentModelTime(state),
    totalSimulationTime: getSimulationTimeInSeconds(state),
    error: getLastError(state),
  };
};

export default connect(mapStateToProps)(Results);
