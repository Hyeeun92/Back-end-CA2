
//declarations 
//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3001
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const Member = require('./member.js')


//make the app use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}))

//API ROUTES
//show all dogs from the database using GET request
app.get('/member', (req, res) => {
  //find all dogs in the database and store them in the "result" variable
  //use the Model created in the dog.js file to retrieve all dog entries from the database
  Member.find((err, members) => {
    //in case there is an error with our Dog model, we we will send it to the user(postman)
    if (err) {
      res.send("Error occured no dog retrieved")
      return
    }
    //if no error send the array conting dogs to the user/postman
    res.send(members)
    //log the result in the console as well
    console.log(members)
  })
})
// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/member/:id', (req, res) => {
  const id = req.params.id;
  // we use the findById query, details on https://mongoosejs.com/docs/queries.html
  // this query only returns one element
  // you can also use findOneById
  // you can also use findOne({_id:req.paramas.id}) - this query will find depending on other properties,
  //                                    e.g. breed, name
  //                                    will only return first element found
  // to return more then 1 element use find({}) // see previous request
  Member.findById(id, (err, member) => {
    if (err) {
      res.send("not found")
      return
    }
    //"dog" is an object file retrieved from the database
    //"dog" will only be defined if there is a dog with the specific id
    // inside the Database
    // for a wrong ID, "dog" will be undefined

    //we will send it back to the user/postman
    res.send(member)
    console.log(member)
  })
})

//insert request using POST to add a dog into the database
app.post('/member', (req, res) => {

  let _personalTraining = false;
  if (req.body.personalTraining === 'true') {
    _personalTraining = true;
  }
  let _locker = false;
  if (req.body.locker === 'true') {
    _locker = true;
  }
  let _poor = false;
  if (req.body.poor === 'true') {
    _poor = true;
  }
  let _shower = false;
  if (req.body.shower === 'true') {
    _shower = true;
  }

  let member = new Members({
    name: req.body.name, 
    gender: req.body.gender, 
    yearOfBirth: parseInt(req.body.yearOfBirth),
    personalTraining: _personalTraining, 
    facility: { locker: _locker, poor: _poor, shower: _shower}
  });

  //inserting a dog and checking to see if any errors occured
  member.save(err => {
    if (err) {
      // if error send a message to let the user know
      res.send(`Member not inserted into the database, error is: ${err}`)
      //return to be used in order to not send to res.send and crash the program
      return
    }
    //send a message to the user with the result
    res.send("Member inserted into the database")
    console.log("Member is in the database")
  })

  //if return runs, code will start from here
  return
})
// -->
// PUT request to update or modify one dog from the database
app.put('/member/:id', (req, res) => {
  // you can use fineOneAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  // or
  // you can use findByIdAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  // You can use req.params.id to send the _id and req.body for your new variables
  // or you can send all variables, including id, in req.body
  console.log(req.body);

  Member.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    gender: req.body.gender,
    yearOfBirth: ((parseInt(req.body.yearOfBirth) == NaN) ? 0 : parseInt(req.body.yearOfBirth)),
    personalTraining: (req.body.personalTraining === 'true'),
    facility:{ locker:(req.body.locker === 'true'),
              poor: (req.body.poor === 'true'),
              shower: (req.body.shower === 'true')}
   
    
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is: " + err);
      return;
    }
    res.send("It did edit");
  })
})


//delete request using DELETE and a PARAMETER (id)
app.delete('/member/:id', (req, res) => {

  // You can use findOneAndDelete({_id:})
  // or
  // You can use findByIdAndDelete(id)
  //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
  Member.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("Member did not delete")
      return
    }
    res.send("Member deleted")
    console.log(`Member with id ${req.params.id} is now deleted`)
  })
})

//start the server
app.listen(port, () => {
  //change the link to your database
  mongoose.connect('mongodb+srv://admin:admin@gymmemberapi.6ztao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})

