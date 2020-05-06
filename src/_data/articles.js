const axios = require('axios');
const showdown = require('showdown');
const converter = new showdown.Converter();
require('dotenv').config();


// Make a request for a user with a given ID
module.exports = axios.get(('http://localhost:1337/articles'),{
  headers: {
    Authorization: process.env.API_KEY
  },
})
  .then(function (response) {
    // handle success
    // return response.data;
    var articlesArray = [];
    response.data.forEach(function(data){
      var artObj = {
        name: data.title,
        author: data.author.username,
        content: converter.makeHtml(data.content),
        image: data.image.url,
        id: data.id
      };
      articlesArray.push(artObj);
    });
    return articlesArray;
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
 