import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setPokemonDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching Pokemon details:', error);
      });
  }, [id]);

  const catchPokemon = () => {
    const successProbability = Math.random() < 0.5;
    if (successProbability) {
      const nickname = prompt('Congratulations! You caught the Pokemon! Enter a nickname:');
      if (nickname !== null && nickname !== '') {
        axios.post('http://localhost:5000/api/catch-pokemon', {
          name: pokemonDetails.name,
          nickname: nickname,
          types: pokemonDetails.types.map(type => type.type.name),
          moves: pokemonDetails.moves.slice(0, 5).map(move => move.move.name),
          image: pokemonDetails.sprites.front_default
        })
        .then(response => {
          alert(`You added ${response.data.name} (${response.data.nickname}) to your Pokemon list.`);
        })
        .catch(error => {
          console.error('Error catching Pokemon:', error);
          alert('Failed to catch Pokemon. Please try again later.');
        });
      } else {
        alert('Please enter a valid nickname.');
      }
    } else {
      alert('Oops! The Pokemon fled. Try again later.');
    }
  };

  return (
    <div>
      <br />
      <div className="d-flex justify-content-center align-items-center">
        {pokemonDetails ? (
          <Card className="text-center pokemon-detail">
            <Card.Img variant="top" src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} style={{ width: '250px', height: '250px', margin: 'auto' }} />
            <Card.Body>
              <Card.Title>{pokemonDetails.name}</Card.Title>
              <ListGroup variant="flush" className="d-flex justify-content-center">
                <ListGroup.Item>
                  <strong>Types:</strong>
                  <br />
                  {pokemonDetails.types.map((type, index) => (
                    <span key={index}>{type.type.name}{index !== pokemonDetails.types.length - 1 ? ', ' : ''}</span>
                  ))}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush" className="d-flex justify-content-center">
                <ListGroup.Item>
                  <strong>Moves:</strong>
                  <br />
                  <div>
                    {pokemonDetails.moves.slice(0, 5).map((move, index) => (
                      <span key={index}>{move.move.name}{index !== pokemonDetails.moves.slice(0, 5).length - 1 ? ', ' : ''}</span>
                    ))}
                  </div>
                </ListGroup.Item>
              </ListGroup>
              <Button onClick={catchPokemon} className="btn-catch">Catch Pokemon</Button>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default PokemonDetail;
