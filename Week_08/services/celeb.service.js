const axios = require('axios');
const celebDao = require('../repositories/celeb.dao');

const celebService = {
  searchCelebrity: async (name) => {
    // if the param is a number (id)
    if (!isNaN(name)) {
      // TODO: fetch celebs by id from db
    }
    // the param is a string (name)
    else {
      // search database for the celebrity
      const celebrities = await celebDao.getByName(name);

      if (celebrities.length !== 0) {
        return {
          success: true,
          status: 200,
          data: {
            message: 'Celebrities fetched!',
            celebrities: celebrities,
          },
        };
      } else {
        // fetch celebrities from API ninja using axios
        try {
          const response = await axios.get(`https://api.api-ninjas.com/v1/celebrity?name=${name}`, {
            headers: {
              'X-Api-Key': process.env.NINJA_API_KEY,
            },
          });

          // TODO: save celebs to database

          return {
            success: true,
            status: 200,
            data: {
              message: 'Celebrities fetched!',
              celebrities: response.data,
            },
          };
        } catch (error) {
          throw new Error(error.message);
        }
      }
    }
  },
};

module.exports = celebService;
