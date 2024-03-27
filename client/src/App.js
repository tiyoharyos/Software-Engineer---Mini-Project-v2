import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import PokemonList from './components/PokemonListPage';
import PokemonDetail from './components/PokemonDetailPage';
import MyPokemonList from './components/MyPokemonListPage';
import './App.css'; 

function App() {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col md={3} className="bg-light">
            <Sidebar />
          </Col>
          <Col md={9} className="p-4">
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
              <Route path="/my-pokemon-list" element={<MyPokemonList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;