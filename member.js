//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const memberSchema = new Schema({
  
  name: String,
  gender: String,
  yearOfBirth: Number,
  personalTraining: Boolean,
  facility: {
      locker: Boolean,
      poor: Boolean,
      shower: Boolean
  }
  })
//defining the name of the constructor for our class
const Member = mongoose.model('member', memberSchema);
//export the class, also called a model or a document, to use in different files
module.exports = Member
