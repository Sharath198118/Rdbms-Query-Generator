import React, { useState } from 'react';
import './App.css';
import QueryService from './components/QueryService';
import QueryForm from './components/QueryForm';
 
const App = () => {
  const [selectedForm, setSelectedForm] = useState('');
  const [formKey, setFormKey] = useState(0); // Unique key for resetting the form
 
  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
    setFormKey(prevKey => prevKey + 1); // Change key to reset form state
  };
 
  const forms = [
    { value: 'generateCreateTableQuery', label: 'Create Table Query', fields: ['tableName', 'columns'], requiredFields: ['tableName', 'columns'] },
    { value: 'generateAlterTableQuery', label: 'Alter Table Query', fields: ['table', 'operation'], requiredFields: ['table', 'operation'] },
    { value: 'generateDropTableQuery', label: 'Drop Table Query', fields: ['tableName'], requiredFields: ['tableName'] },
    { value: 'generateTruncateTableQuery', label: 'Truncate Table Query', fields: ['tableName'], requiredFields: ['tableName'] },
    { value: 'generateSelectQuery', label: 'Select Query', fields: ['table', 'columns', 'condition', 'orderBy', 'limit'], requiredFields: ['table', 'columns'] },
    { value: 'generateInsertQuery', label: 'Insert Query', fields: ['table', 'columns', 'values'], requiredFields: ['table', 'columns', 'values'] },
    { value: 'generateUpdateQuery', label: 'Update Query', fields: ['table', 'setValues', 'condition'], requiredFields: ['table', 'setValues', 'condition'] },
    { value: 'generateDeleteQuery', label: 'Delete Query', fields: ['table', 'condition'], requiredFields: ['table', 'condition'] },
    { value: 'generateJoinQuery', label: 'Join Query', fields: ['table', 'columns', 'joinTable', 'joinCondition'], requiredFields: ['table', 'columns', 'joinTable', 'joinCondition'] },
    { value: 'generateDistinctQuery', label: 'Distinct Query', fields: ['table', 'columns'], requiredFields: ['table', 'columns'] },
    { value: 'generateGroupByQuery', label: 'Group By Query', fields: ['table', 'columns', 'groupByColumns'], requiredFields: ['table', 'columns', 'groupByColumns'] },
    { value: 'generateHavingQuery', label: 'Having Query', fields: ['table', 'columns', 'groupByColumns', 'havingCondition'], requiredFields: ['table', 'columns', 'groupByColumns', 'havingCondition'] },
    { value: 'generateCreateIndexQuery', label: 'Create Index Query', fields: ['indexName', 'tableName', 'columns'], requiredFields: ['indexName', 'tableName', 'columns'] },
    { value: 'generateGrantQuery', label: 'Grant Query', fields: ['privileges', 'tableName', 'user'], requiredFields: ['privileges', 'tableName', 'user'] },
    { value: 'generateRevokeQuery', label: 'Revoke Query', fields: ['privileges', 'tableName', 'user'], requiredFields: ['privileges', 'tableName', 'user'] },
    { value: 'generateDenyQuery', label: 'Deny Query', fields: ['privileges', 'tableName', 'user'], requiredFields: ['privileges', 'tableName', 'user'] },
    
  ];
 
  return (
    <div className="App">
      <h1>RDBMS Query Generator</h1>
 
      <div className="form-control">
        <label htmlFor="select-form"></label>
        <select id="select-form" value={selectedForm} onChange={handleFormChange}>
          <option value="" disabled>Select a Query</option>
          {forms.map((form, index) => (
            <option key={index} value={form.value}>{form.label}</option>
          ))}
        </select>
      </div>
 
      {selectedForm && (
        <div className="query-form">
          <h2>{forms.find(form => form.value === selectedForm).label}</h2>
          <QueryForm
            key={formKey} // Use key to reset form
            endpoint={selectedForm}
            fields={forms.find(form => form.value === selectedForm).fields}
            requiredFields={forms.find(form => form.value === selectedForm).requiredFields}
            queryService={QueryService}
          />
        </div>
      )}
    </div>
  );
};
 
export default App;
 