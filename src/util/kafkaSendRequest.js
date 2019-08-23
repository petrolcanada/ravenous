const axios = require('axios');

axios.get('http://localhost:3000/kafka/producer?message=a testing message from Axios')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });