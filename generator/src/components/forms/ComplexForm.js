import React, { useState } from 'react';

function ComplexForm() {
  const [file, setFile] = useState(null);
  const [numParticles, setNumParticles] = useState('');
  const [fractalTreatment, setFractalTreatment] = useState('');
  const [heightProfileFile, setHeightProfileFile] = useState(null);
  const [lossFunction, setLossFunction] = useState('');
  const [doCoagulation, setDoCoagulation] = useState('');
  const [coagulationKernelOptions, setCoagulationKernelOptions] = useState('');
  const [doNucleation, setDoNucleation] = useState('');

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleHeightProfileUpload = (event) => {
    setHeightProfileFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Choose file to upload:</label>
        <input type="file" id="file" onChange={handleFileUpload} />
      </div>
      <div>
        <label htmlFor="num-particles" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Total number of particles:</label>
        <input
          type="number"
          id="num-particles"
          value={numParticles}
          onChange={(event) => setNumParticles(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fractal-treatment" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Fractal treatment:</label>
        <select
          id="fractal-treatment"
          value={fractalTreatment}
          onChange={(event) => setFractalTreatment(event.target.value)}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div>
        <label htmlFor="height-profile-file" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Height profile file:</label>
        <input type="file" id="height-profile-file" onChange={handleHeightProfileUpload} />
      </div>
      <div>
        <label htmlFor="loss-function" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Loss function specification:</label>
        <input
          type="text"
          id="loss-function"
          value={lossFunction}
          onChange={(event) => setLossFunction(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="do-coagulation" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Do coagulation:</label>
        <select
          id="do-coagulation"
          value={doCoagulation}
          onChange={(event) => setDoCoagulation(event.target.value)}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div>
        <label htmlFor="coagulation-kernel-options" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Coagulation kernel options:</label>
        <select
          id="coagulation-kernel-options"
          value={coagulationKernelOptions}
          onChange={(event) => setCoagulationKernelOptions(event.target.value)}
        >
          <option value="brownian">Brownian</option>
          <option value="sedimentation">Sedimentation</option>
          <option value="additive">Additive</option>
          <option value="constant">Constant</option>
          <option value="zero">Zero</option>
        </select>
      </div>
      <div>
        <label htmlFor="do-nucleation" style={{paddingRight: '1rem', paddingBottom: '1rem'}}>Do nucleation:</label>
        <select
            id="do-nucleation"
            value={doNucleation}
            onChange={(event) => setDoNucleation(event.target.value)}
        >
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    </div>
<button type="submit">Submit</button>
</form>
);
}

export default ComplexForm;