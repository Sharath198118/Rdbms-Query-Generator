import axios from 'axios';
 
const API_BASE_URL = `http://localhost:8081/query`;  // Adjust the base URL according to your backend
 
const generateQuery = (endpoint, data) => {
  return axios.post(`${API_BASE_URL}/${endpoint}`, data);
};
 
const QueryService = {
  generateSelectQuery: (data) => generateQuery('ddl/generateSelectQuery', data),
  generateDistinctQuery: (data) => generateQuery('ddl/generateDistinctQuery', data),
  generateJoinQuery: (data) => generateQuery('ddl/generateJoinQuery', data),
  generateGroupByQuery: (data) => generateQuery('ddl/generateGroupByQuery', data),
  generateHavingQuery: (data) => generateQuery('ddl/generateHavingQuery', data),
  generateInsertQuery: (data) => generateQuery('dml/generateInsertQuery', data),
  generateUpdateQuery: (data) => generateQuery('dml/generateUpdateQuery', data),
  generateDeleteQuery: (data) => generateQuery('dml/generateDeleteQuery', data),
  generateTruncateTableQuery: (data) => generateQuery('ddl/generateTruncateTableQuery', data),
  generateDropTableQuery: (data) => generateQuery('ddl/generateDropTableQuery', data),
  generateAlterTableQuery: (data) => generateQuery('ddl/generateAlterTableQuery', data),
  generateCreateIndexQuery: (data) => generateQuery('ddl/generateCreateIndexQuery', data),
  generateGrantQuery: (data) => generateQuery('dml/generateGrantQuery', data),
  generateRevokeQuery: (data) => generateQuery('dml/generateRevokeQuery', data),
  generateDenyQuery: (data) => generateQuery('dml/generateDenyQuery', data),
  generateCreateTableQuery: (data) => generateQuery('ddl/generateCreateTableQuery', data),
};
 
export default QueryService;