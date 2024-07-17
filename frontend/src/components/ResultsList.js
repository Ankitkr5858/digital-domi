import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

const ResultsList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/upload`);
        setResults(res.data);
      } catch (err) {
        console.error('Error fetching results', err);
      }
    };

    fetchResults();
  }, []);

  const deleteResult = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/upload/${id}`);
      setResults(results.filter(result => result._id !== id));
    } catch (err) {
      console.error('Error deleting result', err);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Results List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Text</th>
            <th>Analysis Result</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result._id}>
              <td>{index + 1}</td>
              <td>{result.text}</td>
              <td>{result.analysisResult}</td>
              <td>
                <a target='_blank' href={`${process.env.REACT_APP_BACKEND_URL}${result.imageUrl}`}><img src={`${process.env.REACT_APP_BACKEND_URL}${result.imageUrl}`} alt="Uploaded" width="100" /></a>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteResult(result._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ResultsList;