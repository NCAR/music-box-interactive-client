import React from "react";
import { connect } from "react-redux";
import { addCondition } from "../../redux/actions";
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const AddCondition = (props) => {
  const handleAddCondition = () => {
    props.addCondition({ schema: props.schema });
  };

  return (
    <Button variant="contained" color="primary"
      onClick={handleAddCondition}
      onKeyDown={handleAddCondition} fullWidth
    >
      <AddIcon />
    </Button>
  );
};

export default connect(null, { addCondition })(AddCondition);
