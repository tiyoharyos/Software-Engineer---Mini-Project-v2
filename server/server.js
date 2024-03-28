// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const mongoose = require('mongoose'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pokemonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define Pokemon schema
const pokemonSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  types: [String],
  moves: [String],
  image: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Fetch Pokemon list from PokeAPI
app.get('/api/pokemon', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon list' });
  }
});

// Fetch my Pokemon list from MongoDB
app.get('/api/my-pokemon', async (req, res) => {
  try {
    const myPokemonList = await Pokemon.find();
    res.json(myPokemonList);
  } catch (error) {
    console.error('Error fetching My Pokemon List:', error);
    res.status(500).json({ error: 'Failed to fetch My Pokemon List' });
  }
});

// Delete a Pokemon from my list
app.delete('/api/release/:pokemonId', async (req, res) => {
  const { pokemonId } = req.params;
  try {
    const deletedPokemon = await Pokemon.findByIdAndDelete(pokemonId);
    if (deletedPokemon) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Pokemon not found' });
    }
  } catch (error) {
    console.error('Error releasing Pokemon:', error);
    res.status(500).json({ error: 'Failed to release Pokemon' });
  }
});

// Catch Pokemon route
app.post('/api/catch-pokemon', async (req, res) => {
  const { name, nickname, types, moves, image } = req.body;
  try {
    const newPokemon = new Pokemon({ name, nickname, types, moves, image });
    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (error) {
    console.error('Error saving Pokemon:', error);
    res.status(500).json({ error: 'Failed to save Pokemon' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
