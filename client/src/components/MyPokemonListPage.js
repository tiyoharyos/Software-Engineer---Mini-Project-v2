import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';

const MyPokemonList = () => {
  const [myPokemonList, setMyPokemonList] = useState([]);

  useEffect(() => {
    // Implement logic to fetch "My Pokemon List"
    axios.get('http://localhost:5000/api/my-pokemon')
      .then(response => {
        setMyPokemonList(response.data);
      })
      .catch(error => {
        console.error('Error fetching My Pokemon List:', error);
      });
  }, []);

  const releasePokemon = (pokemonId) => {
    // Implement logic to release Pokemon
    axios.delete(`http://localhost:5000/api/release/${pokemonId}`)
      .then(response => {
        if (response.data.isPrime) {
          alert(`You released the Pokemon with ID ${pokemonId}.`);
          // Implement logic to remove released Pokemon from state
          setMyPokemonList(myPokemonList.filter(pokemon => pokemon.id !== pokemonId));
        } else {
          alert('Release failed. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error releasing Pokemon:', error);
      });
  };

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
    <div>
      <div style={containerStyle}>
        <h1 className="text-center mb-5" style={Title}>My Pokemon List</h1>
        <Row className="justify-content-center">
          {myPokemonList.map(pokemon => (
            <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body className="text-center">
                  <Card.Title>{pokemon.nickname} ({pokemon.name})</Card.Title>
                  <Button onClick={() => releasePokemon(pokemon.id)} variant="danger">Release</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default MyPokemonList;
