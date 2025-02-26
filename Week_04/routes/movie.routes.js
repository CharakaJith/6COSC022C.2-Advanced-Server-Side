const express = require('express');
const movieController = require('../controllers/movie.controller');

const movieRouter = express.Router();

movieRouter.post('/', movieController.createNewMovie);
movieRouter.get('/', movieController.getAllMovies);
movieRouter.get('/:id', movieController.getMovieById);
movieRouter.get('/search/:name', movieController.searchMovie);
movieRouter.delete('/:id', movieController.deleteMovie);

module.exports = movieRouter;
