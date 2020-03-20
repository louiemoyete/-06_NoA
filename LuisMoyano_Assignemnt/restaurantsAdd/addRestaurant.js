





							/** ** ** *
			Luis Moyano, ID: 101064606
			CompSci 2406 : McKenney 
			Client-Side Javascript ( No. ii ) 
							* ** ** **/
// Define Commenting Format : 
							/** ** ** *
			Function : 
			Parametres : 
			Functionality : 
			Return:
			Local Variables : 
							* ** ** **/
							/** ** ** *
			Global Variables
							* ** ** **/
// Saves the current Restaurants Information
	newRestaurant = {};
							/** ** ** *
			Function : createRestaurant() 
			Parametres : N/A
			Funcitonality : 
				Takes in the values from the text boxes. 
				Checks if they are blanks. 
				Creates a new restaurant. 
				Makes a POST request to the server. 
				The server then loops through the restaurants, counting them, 
				giving the new restaurant its unique ID. 
				Once done, it redirects back to '/restaurants/
							* ** ** **/	
	function createRestaurant()
	{
		newName = document.getElementById( 'newName' ).value;
		newDelFee = document.getElementById( 'newDelFee' ).value;
		newMinOrder = document.getElementById( 'newMinOrder' ).value;
		if(( newName == '' )||( newDelFee == '' )||( newMinOrder == '' ))
		{
			alert( 'Must fill values. Changes not saved.' );
		}
		else
		{
			newRestaurant[ 'id' ] = 0;
			newRestaurant[ 'name' ] = newName;
			newRestaurant[ 'min_order' ] = newDelFee;
			newRestaurant[ 'delivery_fee' ] = newMinOrder;
			newRestaurant[ 'menu' ] = {};
			
			console.log( newRestaurant ); 
			
			let req = new window.XMLHttpRequest();
			req.open( 'POST', '/restaurants', true );
			req.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
			req.send( JSON.stringify( newRestaurant ));
			req.onload = () =>
			{
				window.location = (`http://localhost:3000/restaurants`);
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	