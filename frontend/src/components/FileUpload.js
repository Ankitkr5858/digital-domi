import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(''); // For alert variant

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setFile(null);
      setMessage('Please select a valid image file');
      setVariant('danger');
    }
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select an image to upload');
      setVariant('danger');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', text);

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('File Uploaded Successfully');
      setVariant('success');
    } catch (err) {
      setMessage('Error Uploading File');
      setVariant('danger');
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Upload File with Text</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select an image to upload</Form.Label>
          <Form.Control type="file" onChange={onFileChange} />
        </Form.Group>
        <Form.Group controlId="formText" className="mb-3">
          <Form.Label>Enter text</Form.Label>
          <Form.Control
            type="text"
            value={text}
            onChange={onTextChange}
            placeholder="Enter text"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
      {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
    </Container>
  );
};

export default FileUpload;