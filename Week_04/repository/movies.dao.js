const db = require('../database/connection');

const movieDao = {
  createNewMovie: async (movie) => {
    return new Promise((resolve, reject) => {
      const insertQuery = 'INSERT INTO movies (title, director, genre, rating, released) VALUES (?, ?, ?, ?, ?)';
      const values = [movie.title, movie.director, movie.genre, movie.rating, movie.released];

      db.run(insertQuery, values, function (error) {
        if (error) return reject(new Error(`Failed to create new movie: ${error.message}`));

        return movieDao
          .getMovieById(this.lastID)
          .then((user) => resolve(user))
          .catch((error) => reject(error));
      });
    });
  },

  getMovieById: async (movieId) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM movies WHERE id = ?';

      db.get(selectQuery, [movieId], function (error, row) {
        if (error) return reject(new Error(`Failed to get movie by id ${movieId}: ${error.message}`));

        return resolve(row);
      });
    });
  },

  getMovieByTitle: async (title) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM movies WHERE title = ?';

      db.get(selectQuery, [title], function (error, row) {
        if (error) return reject(new Error(`Failed to get movie by title ${title}: ${error.message}`));

        return resolve(row);
      });
    });
  },
};

module.exports = movieDao;
