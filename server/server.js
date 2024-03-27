// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors package

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Use cors middleware

// Mock data for my Pokemon list
let myPokemonList = [];

// Endpoint to fetch Pokemon list
app.get('/api/pokemon', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon list' });
  }
});

// Endpoint to fetch my Pokemon list
app.get('/api/my-pokemon', (req, res) => {
  res.json(myPokemonList);
});

// Endpoint to release a Pokemon
app.delete('/api/release/:pokemonId', (req, res) => {
  const { pokemonId } = req.params;
  const isPrime = isPrimeNumber(parseInt(pokemonId));
  if (isPrime) {
    myPokemonList = myPokemonList.filter(pokemon => pokemon.id !== parseInt(pokemonId));
  }
  res.json({ isPrime });
});

// Function to check if a number is prime
function isPrimeNumber(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
