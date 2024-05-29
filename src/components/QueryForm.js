import React, { useState } from 'react';

const QueryForm = ({ endpoint, fields, requiredFields, queryService }) => {
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formIsValid = true;
    let errors = {};

    requiredFields.forEach(field => {
      if (!formData[field]) {
        formIsValid = false;
        errors[field] = 'This field is required';
      }
    });

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const dataToSubmit = { ...formData };

        // Convert privileges to array if the endpoint requires it
        if (endpoint === 'generateGrantQuery' || endpoint === 'generateRevokeQuery' || endpoint === 'generateDenyQuery') {
          if (formData.privileges) {
            dataToSubmit.privileges = formData.privileges.split(',').map(privilege => privilege.trim());
          }
        }

        // // Convert columns string to an object if the endpoint requires it
        if (endpoint === 'generateCreateTableQuery' && formData.columns) {
          try {
            dataToSubmit.columns = JSON.parse(formData.columns);
          } catch (err) {
            setResponse('Invalid columns JSON format');
            return;
          }
        }

        // Convert columns string to an object if the endpoint requires it
        if (endpoint === 'generateCreateIndexQuery' && formData.columns) {
          try {
            dataToSubmit.columns = JSON.parse(formData.columns);
          } catch (err) {
            setResponse('Invalid columns JSON format');
            return;
          }
        }
        const response = await queryService[endpoint](dataToSubmit);
        setResponse(response.data);
      } catch (error) {
        setResponse(error.message);
      }
    }
  };

  // Function to copy the query to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(() => {
      alert('Query copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="form-group">
            <label htmlFor={field}>{field}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <button type="submit" className='submit-button'>Generate Query</button>
      </form>

      <button
        onClick={copyToClipboard}
        className="copy-button"
      >
        Copy the Query
      </button>
      <pre className="response-container">
        <div className="response">
          {response}
        </div>
      </pre>

    </div>

  );
};

export default QueryForm;
