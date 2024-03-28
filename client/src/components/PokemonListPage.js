import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const PokemonList = () => {
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

  const Title = {
    fontSize: '4rem',
    fontWeight: '800',
    lineHeight: '1',
    textShadow: '2px 2px black',
    color: "white",
  };

  const containerStyle = {
    paddingTop: '20px', // Add some padding top for better visual appearance
  };

  return (
    <div >
      <div style={containerStyle}>
        <h1 className="text-center mb-5" style={Title}>Pokemon List</h1>
        <Row className="justify-content-center">
          {pokemonList.map(pokemon => (
            <Col key={pokemon.name} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body className="text-center">
                  <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Title>{pokemon.name}</Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default PokemonList;
