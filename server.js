





							/** ** ** *
			Luis Moyano, ID: 101064606
			CompSci 2406 : McKenney 
			Server-Side Javascript 
							* ** ** **/
// Define Commenting Format : 
							/** ** ** *
			Function : 
			Parametres : 
			Functionality : 
			Return:
			Local Variables : 
							* ** ** **/	
// Define Packages 
	const fs = require( 'fs' ); 
	const path = require( 'path' );
	const ejs = require( 'ejs' );
// Load in the Express Framework. Make an Express object 
	const express = require( 'express' );
	const app = express();
	
// Setting the view engine to EJS 
	app.set( 'view engine', 'ejs' ); 
	//app.set( 'views', './views' );

							/** ** ** *
			Global Variables
							* ** ** **/
// Saves the JSON restaurants as JS objects 
	let restaurantArray_onJS = [];



							/** ** ** *
			Start : 
							* ** ** **/							
// Read each file in the restaurant directory 
	const read_Directory = fs.readdirSync( './restaurantDatabase/' );
// Parse the JSON, add it to an array 
	read_Directory.forEach( fileName =>
	{
		const read_File = fs.readFileSync( './restaurantDatabase/' + fileName );
		const jsObj = JSON.parse( read_File );
		restaurantArray_onJS.push( jsObj );
	});
					
							/** ** ** *
								toDelete 
							* ** ** **/
// This example shows a middleware function with no mount path. 
// The function is executed every time the app received a request
	app.use( function ( req, res, next ) 
	{
		console.log( " ----------------------------- ");
		console.log( "Method: " + req.method );
		console.log( "URL: " + req.url );
		console.log( "PATH: " + req.path  );
		console.log( "CONTENT TYPE: " + req.get( "Content-Type" ) );
		next();
	});
							/** ** ** *
								toDelete 
							* ** ** **/
							/** ** ** *
			Functions : 
							* ** ** **/
							/** ** ** *
			Function : sendError() 
			Parametres : 
				res : response sent by the router 
				x : integer representing the error code 
			Funcitonality : 
				Helper Function. 
				Checks the error code, prints a different message per error code. 
							* ** ** **/
	function sendError( res, x )
	{
		if( x==404 ) 
		{	
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.write('Error 404: Sorry not Sorry ... Resource not found ...');
		}else if( x==500 )
		{
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.write('Error 500: Sorry not Sorry ... Server had a problem ...');
		}
		res.end();
	}
							/** ** ** *
			Handling Routes : 
							* ** ** **/
							/** ** ** *
			GET Requests :
							* ** ** **/
// GET Route for : '/'
	app.get( '/', ( req, res )=>
	{ 
// res.type : will set the Content-Type response header
		res.setHeader("Content-Type", "text/html");
// res.status : sets the status code of this response 
		res.status( 200 ); 
// __dirname : refer to current directory 
		let currentDirectory = __dirname;
// path.join() : joins and normalises all given path segments
		let GET_Response = path.join( currentDirectory+"/index/index.html" );
		res.sendFile( GET_Response );
	});
		// We repeat this format for the rest of the GET Requests // 

// GET Route for : '/header.css' from '/index.html' or 'restaurants.ejs'
	app.get( '/header.css', ( req, res )=>
	{
		res.setHeader("Content-Type", "text/css");
		res.status( 200 ); 
		currentDirectory = __dirname;
		GET_Response = path.join( currentDirectory+"/views/header.css" );
		res.sendFile( GET_Response );
	});
	
// GET Route for : '/restaurants'
	app.get( '/restaurants', ( req, res )=>
	{
// Create key value pair with format : { restaurant's id : restaurant's name }
		const restaurantNames = {};
		restaurantArray_onJS.forEach( joint =>
		{
			restaurantNames[ `${joint.id}` ] = joint.name;
		});
// Convert said set to JSON 			
		let restaurantNamesJSON = JSON.stringify( restaurantNames );
// Check header for requested MIME Type 
		res.format(
		{
// If html is requested
			"text/html" :()=>
			{
// Render ejs file with JSON data
				ejs.renderFile( './restaurants/restaurants.ejs', { restaurantNamesJSON }, {/*options*/}, function( err, data )
				{
					if( err )
					{
						sendError( res, 500 );
					}
					else
					{
						res.status( 200 );
						res.setHeader("Content-Type", "text/html");
						res.end( data );
					}
				})
			},
// If JSON is requested
			"application/json": () => 
			{
// Make an array of IDs
				const restaurantNamesJSON_array = [];
				Object.keys( restaurantNames ).forEach( id =>
				{
					restaurantNamesJSON_array.push( id );
					console.log( id );
				});
				const restaurantNamesJSON = { 'restaurants':restaurantNamesJSON_array } 
				res.send( restaurantNamesJSON );
			}
		});
	});

// GET Route for : '/restaurants/:restID'
	app.get( '/restaurants/:restID', ( req, res )=>
	{
// Start a boolean to check if ID given in parametres exists in the restaurant array
		myBoolean = false;
		let chosenID = {};
		Object.keys( restaurantArray_onJS ).forEach(( id )=> 
		{
			if( id == req.params.restID )
			{
				chosenID = JSON.stringify( restaurantArray_onJS[ id ]);
// Set the boolean to true if the match was found 
				myBoolean = true;
			}
		});
		res.format(
		{
			"text/html" :()=>
			{
				if( myBoolean == false ) 
				{
					sendError( res, 404 );
				}
				else
				{
// Render ejs file, giving it the restaurant with the ID in the parametre
					ejs.renderFile( './restaurants/restaurantData.ejs', { chosenID }, {/*options*/}, function( err, data )
					{
						if( err )
						{
							sendError( res, 500 );
						}
						else
						{
							res.status( 200 );
							res.setHeader("Content-Type", "text/html");
							res.end( data );
						}
					})
				}
			},
			"application/json": () => 
			{
				if( myBoolean == false ) 
				{
					sendError( res, 404 );
				}
				else
				{
					res.send( chosenID );
				}
			}
		});
	});	

// GET Route for : '/clientRestaurants.js' from 'restaurantData.ejs'
	app.get( '/clientRestaurants.js', ( req, res )=>
	{
		res.setHeader("Content-Type", "text/javascript");
		res.status( 200 ); 
		currentDirectory = __dirname;
		GET_Response = path.join( currentDirectory+"/restaurants/clientRestaurants.js" );
		res.sendFile( GET_Response );
	});

// GET Route for : '/addrestaurant'
	app.get( '/addrestaurant.html', ( req, res )=>
	{ 
		res.setHeader("Content-Type", "text/html");
		res.status( 200 ); 
		let currentDirectory = __dirname;
		let GET_Response = path.join( currentDirectory+"/restaurantsAdd/addrestaurant.html" );
		res.sendFile( GET_Response );
	});

// GET Route for : '/addRestaurant.js' from 'addrestaurant.html'
	app.get( '/addRestaurant.js', ( req, res )=>
	{
		res.setHeader("Content-Type", "text/javascript");
		res.status( 200 ); 
		currentDirectory = __dirname;
		GET_Response = path.join( currentDirectory+"/restaurantsAdd/addRestaurant.js" );
		res.sendFile( GET_Response );
	});
	
	
	
							/** ** ** *
			POST Requests :
							* ** ** **/
			/** ** ** *
							I tbh don't understand why I need this but I copied it 
							from an example in geekforgeeks on how to app.post. 
							It works, and I'm a wee bit 'fraid that everything'll 
							break it I take it off so here it is - -- -- -- 
			* ** ** **/
	var bodyParser = require( 'body-parser' );
	app.use( bodyParser.urlencoded({ extended: false }));
	app.use( bodyParser.json() );
			/** ** ** *
							-- -- -- - 
			* ** ** **/
// POST Route for : '/updateRestaurants' from 'clientRestaurants.js'
	app.post( '/updateRestaurants', ( req, res )=>
	{

// Takes in the body of the request 
		let newRestaurantData = req.body;
// Creates a new array, pushing every restaurant in restaurantArray_onJS onto it 
		let newRestaurantData_array = [];
		restaurantArray_onJS.forEach( restaurant =>
		{
// Except for the one that matches the id of the restaurant given in the request 
			if( newRestaurantData[ 'id' ] == restaurant[ 'id' ] )
			{
				newRestaurantData_array.push( newRestaurantData );
			}else
			{
// The restaurant given in the request is pushed onto the array, and its counterpart is skipped 
				newRestaurantData_array.push( restaurant );
			}
// The old array is made the new array. Saving, thus, the changes in the global restaurant array 
		});
		restaurantArray_onJS = newRestaurantData_array;
		res.end( 'success' );
	});
		// Repeat process for other POST //
		
// POST Route for : '/restaurants' from 'addRestaurant.js'
	app.post( '/restaurants', ( req, res )=>
	{
		let newRestaurant = req.body;
		let restaurantCounter = 0; 
		restaurantArray_onJS.forEach( restaurant =>
		{
			restaurantCounter+=1;
		});
		newRestaurant[ 'id' ] = restaurantCounter;
		console.log( newRestaurant ); 
		
		restaurantArray_onJS.push( newRestaurant );
		console.log( restaurantArray_onJS );
		console.log( '---------------------' );
		console.log( JSON.stringify( restaurantArray_onJS ));
// Respond with JSON representation of newly created restaurant
		res.end( JSON.stringify( newRestaurant ) );
	});
	
							/** ** ** *
			PUT Requests :
							* ** ** **/
// PUT Route for : '/restaurants/:restID' ; Assumes everything is in the Proper Format 
	app.put( '/restaurants/:restID', ( req, res )=>
	{
// Start a boolean to check if ID given in parametres exists in the restaurant array
		myBoolean = false;
		let index = req.params.restID;
		Object.keys( restaurantArray_onJS ).forEach(( id )=> 
		{
			if( id == index )
			{
// Set the boolean to true if the match was found 
				myBoolean = true;
			}
		});
		res.format(
		{
			"application/json" :()=>
			{
// if the value was found, 
				if( myBoolean == true )
				{
// Change the restaurant in the server for that given in the body 
					restaurantArray_onJS[ index ] = req.body;
					res.end( "this is the success response " );
				}else
				{
// If unvalid, send 404 error 
					sendError( res, 404 );
				}
			}
		});
	});
	
							/** ** ** *
			Start Site on port 3000 : 
							* ** ** **/
	app.listen( 3000 );
	console.log( 'Listening at port 3000' );
							/** ** ** *
			End
							* ** ** **/