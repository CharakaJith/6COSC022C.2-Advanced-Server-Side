const movieService = require('../services/movie.service');

const movieController = {
  createNewMovie: async (req, res) => {
    try {
      const movieData = ({ title, director, genre, rating, released } = req.body);

      const response = await movieService.createNewMovie(movieData);
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {
          message: error.message,
        },
      });
    }
  },

  getAllMovies: async (req, res) => {
    try {
      const response = await movieService.getAllMovies();
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {
          message: error.message,
        },
      });
    }
  },

  getMovieById: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await movieService.getMovieById(id);
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {
          message: error.message,
        },
      });
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await movieService.deleteMovie(id);
      const { status, success, data } = response;

      return res.status(status).json({
        success: success,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {
          message: error.message,
        },
      });
    }
  },
};

module.exports = movieController;
