const { searchMovie } = require('../controllers/movie.controller');
const movieDao = require('../repository/movies.dao');
const field_validator = require('../util/field_validator');

const movieService = {
  createNewMovie: async (data) => {
    const { title, director, genre, rating, released } = data;
    let response;

    // validate user inputs
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(title, 'title', 'Movie title'));
    errorArray.push(await field_validator.validate_string(director, 'director', 'Director name'));
    errorArray.push(await field_validator.validate_string(genre, 'genre', 'Movie genre'));
    errorArray.push(await field_validator.validate_number(rating, 'rating', 'Movie rating'));
    errorArray.push(await field_validator.validate_date(released, 'released', 'Released date'));

    // check for validation errors
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      response = {
        status: 400,
        success: false,
        data: filteredErrors,
      };
    } else {
      const movieObj = {
        title,
        director,
        genre,
        rating,
        released,
      };

      // check movie exists
      const movie = await movieDao.getByTitleAndDirector(movieObj);
      if (movie) {
        response = {
          status: 409,
          success: false,
          data: {
            message: `Movie ${title} by ${director} already saved!`,
          },
        };
      } else {
        // create new movie
        const newMovie = await movieDao.create(movieObj);

        response = {
          status: 201,
          success: true,
          data: {
            message: 'Movie created!',
            movie: newMovie,
          },
        };
      }
    }

    return response;
  },

  getAllMovies: async () => {
    let response;

    const movies = await movieDao.getAll();
    if (movies.length == 0) {
      response = {
        status: 409,
        success: false,
        data: {
          message: 'No movies found!',
        },
      };
    } else {
      response = {
        status: 200,
        success: true,
        data: {
          message: 'Fetched all movies!',
          movies: movies,
        },
      };
    }

    return response;
  },

  getMovieById: async (id) => {
    let response;

    // check movie
    const movie = await movieDao.getById(id);
    if (!movie) {
      response = {
        status: 404,
        success: false,
        data: {
          message: `Invalid movie id ${id}!`,
        },
      };
    } else {
      response = {
        status: 200,
        success: true,
        data: {
          message: `Fetched movie by id: ${id}!`,
          movies: movie,
        },
      };
    }

    return response;
  },

  searchMovie: async (name) => {
    let response;

    // validate user inputs
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(name, 'name', 'Movie name'));

    // check for validation errors
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      response = {
        status: 400,
        success: false,
        data: filteredErrors,
      };
    } else {
      const movies = await movieDao.searchByName(name);

      response = {
        status: 200,
        success: true,
        data: {
          message: 'Fetched movies!',
          movies: movies,
        },
      };
    }

    return response;
  },

  deleteMovie: async (id) => {
    let response;

    // check movie
    const movie = await movieDao.getById(id);
    if (!movie) {
      response = {
        status: 404,
        success: false,
        data: {
          message: `Invalid movie id ${id}!`,
        },
      };
    } else {
      // delete movie
      await movieDao.delete(id);

      response = {
        status: 200,
        success: true,
        data: {
          message: `Movie deleted!`,
        },
      };
    }

    return response;
  },
};

module.exports = movieService;
