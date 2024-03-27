import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 
function MyPokemonList() {
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

  return (
    <div>
      <h1>My Pokemon List</h1>
      <ul>
        {myPokemonList.map(pokemon => (
          <li key={pokemon.id}>
            {pokemon.nickname} ({pokemon.name})
            <button onClick={() => releasePokemon(pokemon.id)}>Release</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPokemonList;
