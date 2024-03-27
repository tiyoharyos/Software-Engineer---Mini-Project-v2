// PokemonList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pokemon')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching Pokemon list:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center mb-4">Pokemon List</h1>
      <Row className="justify-content-center">
        {pokemonList.map(pokemon => (
          <Col key={pokemon.name} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Card.Body className="text-center">
                <Link to={`/pokemon/${pokemon.name}`}>
                  <Card.Title>{pokemon.name}</Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PokemonList;
