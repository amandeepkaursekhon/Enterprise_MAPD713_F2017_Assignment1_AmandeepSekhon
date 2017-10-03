
/*  MAPD713 -Enterprise Technologies for Mobile Platforms */
/* Amandeep Kaur Sekhon -29/09/2017 */

/*----------------------------------------------------------------------------------------------*/
 
// Json server

var SERVER_NAME = 'user-api'
var PORT = 3000;
var HOST = '127.0.0.1';
//Read data from json file
var filename = 'storagecode.json';
var fs = require('fs');
var data = fs.readFileSync(filename);
var product_data_JSON = JSON.parse(data);


/*----------------------------------------------------------------------------------------------*/

//load the modules

var http = require('http');
var url = require('url');

/*----------------------------------------------------------------------------------------------*/

//Reset counter

var getcounter = 0;
var postcounter = 0;


var restify = require('restify')

  // Get a persistence engine for the users
  , productsSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server is listening at - ' + HOST + ":" +PORT)
  console.log('Endpoints :' + "http://" + HOST+ ":" + PORT + "/" +"sendGet method: GET")
  console.log("http://" + HOST + ":" + PORT + "/" +"sendGetById method: GET")
  console.log("http://" + HOST + ":" + PORT + "/" + "sendPost method: POST")
  //console.log("http://" + host + ":" + port + "sendUpdate method: PUT")
  //console.log("http://" + host + ":" + port + "sendDelete method: GET")
  //console.log("http://" + host + ":" + port + "sendDeleteById method: GET")
  console.log(' /products/:id')
  
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all users in the system
server.get('/sendGet', function (req, res, next) 

{
  console.log(' > sendGet : Received request')
  console.log("processed request counter" + getcounter++ )


  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {

    // Return all of the users in the system
    res.send(products)
  })
})
// Get all users in the system
server.get('/products', function (req, res, next) 

{
  console.log(' > sendGet : Received request')
  console.log("processed request counter" + getcounter++ )


  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {

    // Return all of the users in the system
    res.send(products)
  })
})


// Get a single user by their user id
server.get('/products/:id', function (req, res, next) {

  // Find a single user by their id within save
  productsSave.findOne({ _id: req.params.id }, function (error, product) {
productsSave.findOne
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (product) {
      // Send the user if no issues
      res.send(product)
    } else {
      // Send 404 header if the user doesn't exist
      res.send(404)
    }
  })
})

// Create a new user
server.post('/sendPost', function (req, res, next) {
  console.log(' > sendPost : Sending response')
  console.log("processed response counter" + ++postcounter )
  // Make sure name is defined
  if (req.params.productname === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('productname must be supplied'))
  }
  if (req.params.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }
  var newproduct = {
		productname: req.params.productname,
		price: req.params.price
	}


  //Writing data in JSON file

  product_data_JSON[req.params.productname] = req.params.price;
  
    var write_data = JSON.stringify(product_data_JSON,null,2);

    fs.writeFile(filename,write_data,finished);

    function finished(err) {console.log('Data stored in json file');}

  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

  // Send the user if no issues
  res.send(201, product)
})

  // Create the user using the persistence engine
  productsSave.create( newproduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the user if no issues
    res.send(201, product)
  })

// Update a user by their id
server.put('/products/:id', function (req, res, next) {

  // Make sure name is defined
  if (req.params.productname === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('productname must be supplied'))
  }
  if (req.params.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }

  var newproduct = {
		_id: req.params.id,
		productname: req.params.productname,
		pricee: req.params.price
	}
 
  // Update the user with the persistence engine
  productsSave.update(newproduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete All products
server.del('sendDelete', function (req, res, next) {
  
     
  // reset given collection
     productsSave = require('save')('products')
    
     // Send a 200 OK response
     res.send('All records deleted')
})
// Delete user with the given id
server.del('/products/:id', function (req, res, next) {
  
    // Delete the user with the persistence engine
    usersSave.delete(req.params.id, function (error, user) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send a 200 OK response
      res.send()
    })
  })