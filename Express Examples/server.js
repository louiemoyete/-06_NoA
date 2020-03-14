





							/** ** ** * 
				Define Commenting Format : 
			Function : 
			Parametres : 
			Functionality : 
			Local Variables : 
							* ** ** **/ 
							/** ** ** *
			Define Requirements 
							* ** ** **/
	const express = require( 'express' );
	const bodyParser = require( 'body-parser' );

							/** ** ** *
			Define Global Variables 
							* ** ** **/
// Create application with Express framework 							
	const app = express();
	
// Set the view engine to ejs --> use res.render to load up an ejs view file
	app.set( 'view engine', 'ejs' );
	
// Create application/x-www-form-urlencoded parser
	const urlencodedParser = bodyParser.urlencoded({ extended: false })
							/** ** ** *
			Express provides a built-in middleware express.static to serve static files, such as images, CSS, JavaScript, etc.
			Pass the name of the directory where you keep your static assets to the express.static middleware to start serving the files directly. 
							* ** ** **/
	app.use( express.static( './public' ));
							/** ** ** *
			Explain usage of certain Node Commands : 
				If we want to find the directory of the file currently being executed/called : 
					__dirname : 
						Gives the path of the currently running file
					process.cwd() :
						Returns the directory from which Node was ran
					Dot Notation (./ and ../) :
						For relative paths
			res.end() vs res.send() 
				Keep in mind, 
					res.send() Sets content type depending on the answer. 
					res.end() sends only text. 
			body-parser : 
				extracts entire body portion of incoming request stream and exposes it on req.body
							* ** ** **/
							
							/** ** ** *
			Define the routes
							* ** ** **/
							/* ** ** **
			GET Requests 
							* ** ** **/
							
							
							
							
// GET handler : /home.html
	app.get( '/home.html', ( req, res )=>
	{
		res.sendFile( __dirname + "/" + "home.html" );
	})

// GET handler : /process_get 
	app.get( '/process_get', ( req, res )=>
	{
// Prepare output in JSON format
	   response = 
	   {
		  first_name: req.query.first_name,
		  last_name: req.query.last_name
	   };
	   console.log( response );
	   res.end( JSON.stringify( response ));
	})

// GET handler : / 
	app.get( '/', ( req, res )=>
	{
		console.log( "Got a GET request for homepage" );
		res.send( 'Hello GET' );
	});

// GET handler : /list_user
	app.get( '/list_user', ( req, res )=> 
	{
	   console.log( "Got a GET request for /list_user" );
	   res.send( 'Page Listing' );
	});

// GET handler : abcd, abxcd, ab123cd, etc.
	app.get( '/ab*cd', ( req, res )=> 
	{   
	   console.log( "Got a GET request for /ab*cd" );
	   res.send( 'Page Pattern Match' );
	});
							/* ** ** **
			POST Requests 
							* ** ** **/
// POST handler : / 
	app.post( '/', ( req, res )=> 
	{
		console.log( "Got a POST req for the homepage" );
		res.end( 'Hello POST' );
	});

// POST handler : /process_post
	app.post( '/process_post', urlencodedParser, ( req, res )=>
	{
// Prepare output in JSON format
	  response = 
	  {
		  first_name: req.body.first_name,
		  last_name: req.body.last_name
	   };
	   console.log( response );
	   res.end( JSON.stringify( response ));
	})


	const server = app.listen( 3000, ()=>
	{
	   const host = server.address().address;
	   const port = server.address().port;
	   console.log( "Example app listening at http://%s:%s", host, port );
	});



































								
								
								