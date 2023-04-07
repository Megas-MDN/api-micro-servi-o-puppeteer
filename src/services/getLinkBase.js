const axios = require('axios');

module.exports = async (urlBase) => {
  console.log('Pegando link na base de dados.');
  const response = await axios.get(urlBase);
  return response.data;
};
