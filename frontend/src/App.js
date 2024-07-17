import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import ResultsList from './components/ResultsList';
import { Navbar, Nav, Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            {/* <Navbar.Brand href="#">App</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Upload</Nav.Link>
                <Nav.Link as={Link} to="/results">Results</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/results" element={<ResultsList />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;