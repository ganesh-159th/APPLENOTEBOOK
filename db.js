const mongoose = require('mongoose');

function connectToMongo() {
  mongoose
    .connect('mongodb+srv://Ganesh:ganesh159@cluster1.zhs7zq4.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB of ganesh159th');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connectToMongo;
