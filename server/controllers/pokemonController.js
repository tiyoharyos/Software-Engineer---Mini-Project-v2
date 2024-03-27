// controllers/pokemonController.js
const axios = require('axios');
const Pokemon = require('../models/Pokemon');

exports.getPokemonList = async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon list' });
  }
};

exports.getCaughtPokemonList = async (req, res) => {
  try {
    const caughtPokemonList = await Pokemon.find();
    res.json(caughtPokemonList);
  } catch (error) {
    console.error('Error fetching caught Pokemon list:', error);
    res.status(500).json({ error: 'Failed to fetch caught Pokemon list' });
  }
};

exports.catchPokemon = async (req, res) => {
  try {
    // Implement logic to catch Pokemon
    // Example: const newPokemon = await Pokemon.create(req.body);
    // res.json(newPokemon);
  } catch (error) {
    console.error('Error catching Pokemon:', error);
    res.status(500).json({ error: 'Failed to catch Pokemon' });
  }
};

exports.releasePokemon = async (req, res) => {
  try {
    const { pokemonId } = req.params;
    // Implement logic to release Pokemon with id `pokemonId`
    // Example: await Pokemon.findByIdAndDelete(pokemonId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error releasing Pokemon:', error);
    res.status(500).json({ error: 'Failed to release Pokemon' });
  }
};
