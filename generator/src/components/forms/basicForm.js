import React, { useState } from 'react';

function MyForm() {
  const [description, setDescription] = useState('');
  const [tolerance, setTolerance] = useState(0);
  const [molWeight, setMolWeight] = useState(0);
  const [fixedConcentration, setFixedConcentration] = useState(0);
  const [density, setDensity] = useState(0);
  const [kappa, setKappa] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tolerance">Absolute Convergence Tolerance:</label>
        <input
          type="number"
          id="tolerance"
          value={tolerance}
          onChange={(event) => setTolerance(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mol-weight">Molecular Weight:</label>
        <input
          type="number"
          id="mol-weight"
          value={molWeight}
          onChange={(event) => setMolWeight(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fixed-concentration">Fixed Concentration:</label>
        <input
          type="number"
          id="fixed-concentration"
          value={fixedConcentration}
          onChange={(event) => setFixedConcentration(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="density">Density:</label>
        <input
          type="number"
          id="density"
          value={density}
          onChange={(event) => setDensity(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="kappa">Kappa:</label>
        <input
          type="number"
          id="kappa"
          value={kappa}
          onChange={(event) => setKappa(event.target.value)}
        />
      </div>
    </form>
  );
}

export default MyForm;