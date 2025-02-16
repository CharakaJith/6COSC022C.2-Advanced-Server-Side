const db = require('../database/connection');

const movieDao = {
  create: async (movie) => {
    return new Promise((resolve, reject) => {
      const insertQuery = 'INSERT INTO movies (title, director, genre, rating, released) VALUES (?, ?, ?, ?, ?)';
      const values = [movie.title, movie.director, movie.genre, movie.rating, movie.released];

      db.run(insertQuery, values, function (error) {
        if (error) return reject(new Error(`Failed to create new movie: ${error.message}`));

        return movieDao
          .getById(this.lastID)
          .then((movie) => resolve(movie))
          .catch((error) => reject(error));
      });
    });
  },

  getAll: async () => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM movies';

      db.all(selectQuery, function (error, rows) {
        if (error) return reject(new Error(`Failed to get all movies: ${error.message}`));

        return resolve(rows);
      });
    });
  },

  getById: async (movieId) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM movies WHERE id = ?';

      db.get(selectQuery, [movieId], function (error, row) {
        if (error) return reject(new Error(`Failed to get movie by id ${movieId}: ${error.message}`));

        return resolve(row);
      });
    });
  },

  getByTitleAndDirector: async (movie) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM movies WHERE title = ? AND director = ?';
      const values = [movie.title, movie.director];

      db.get(selectQuery, values, function (error, row) {
        if (error) return reject(new Error(`Failed to get movie by title ${title}: ${error.message}`));

        return resolve(row);
      });
    });
  },

  delete: async (movieId) => {
    return new Promise((resolve, reject) => {
      const deleteQuery = 'DELETE FROM movies WHERE id = ?';

      db.run(deleteQuery, [movieId], function (error) {
        if (error) return reject(new Error(`Failed to delete movie by id ${movieId}: ${error.message}`));

        resolve();
      });
    });
  },
};

module.exports = movieDao;
