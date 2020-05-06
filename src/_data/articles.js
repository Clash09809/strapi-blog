const axios = require('axios');
const showdown = require('showdown');
const converter = new showdown.Converter();
require('dotenv').config();
var hostURL = 'https://strapi-blog-clash-2.herokuapp.com/articles/';


// Make a request for a user with a given ID
module.exports = axios.get((hostURL),{
  headers: {
    Authorization: process.env.JWT
  },
})
  .then(function (response) {
    // handle success
    // return response.data;
    
    var articlesArray = [];
    response.data.forEach(function(data){
      var artObj = {
        name: data.title,
        author: data.user.username,
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


  
 