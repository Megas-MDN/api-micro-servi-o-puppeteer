const axios = require('axios');

module.exports = (urlPost, body, header) =>
  axios.post(urlPost, body, {
    headers: {
      Authorization: header,
      'content-type': 'application/json',
    },
  });
