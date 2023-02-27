import React, { useState } from 'react';

function GenericForm({ fields }) {
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formValues[field.name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}

export default GenericForm;