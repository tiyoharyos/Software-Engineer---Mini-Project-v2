// routes/pokemonRoutes.js
const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/pokemon', pokemonController.getPokemonList);
router.get('/my-pokemon', pokemonController.getCaughtPokemonList);
router.post('/catch', pokemonController.catchPokemon);
router.delete('/release/:pokemonId', pokemonController.releasePokemon);

module.exports = router;
