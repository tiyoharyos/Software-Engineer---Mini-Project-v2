// PokemonDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
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
        alert(`You added ${pokemonDetails.name} (${nickname}) to your Pokemon list.`);
      } else {
        alert('Please enter a valid nickname.');
      }
    } else {
      alert('Oops! The Pokemon fled. Try again later.');
    }
  };

  return (
    <div>
      {pokemonDetails ? (
        <Card className="text-center pokemon-detail">
          <Card.Body>
            <Card.Title>{pokemonDetails.name}</Card.Title>
            <Card.Img variant="top" src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
            <Card.Text>
              <h2>Types:</h2>
              <ul>
                {pokemonDetails.types.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))}
              </ul>
              <h2>Moves:</h2>
              <ul>
                {pokemonDetails.moves.slice(0, 5).map((move, index) => (
                  <li key={index}>{move.move.name}</li>
                ))}
              </ul>
            </Card.Text>
            <Button onClick={catchPokemon} className="btn-catch">Catch Pokemon</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonDetail;
