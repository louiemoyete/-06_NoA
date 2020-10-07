





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
	currentRestaurant = {};

							/** ** ** *
			Function : init() 
			Parametres : chosenID : 
				Data from chosen restaurant sent by restauranData.ejs
			Funcitonality : 
				Takes in the information, saves it to currentRestaurant ( Global )
							* ** ** **/
	function init( chosenID )
	{
		currentRestaurant = chosenID;
	}
							/** ** ** *
			Function : addCategory() 
			Parametres : N/A
			Funcitonality : 
				Gets the value at textBox newCategory after button 'Add Category' is clicked. 
				Saves it to variable currentRestaurant ( Global ) 
				Checks that the value given is neither blank nor repeated 
							* ** ** **/
	function addCategory()
	{
// Boolean checks if everything is proper 
		let success = true; 
		newCategory = document.getElementById( 'newCategory' ).value;
		if( newCategory == '' )
		{
			alert( 'Must fill a value. Changes not saved.' );
			success = false; 
		}
		else
		{
			Object.keys( currentRestaurant[ 'menu' ] ).forEach( category =>
			{
				if( category == newCategory )
				{
					alert( 'Cannot repeat names. Changes not saved.' );
					success = false;
				}
			});
			if( success == true )
			{
				alert( 'Category added. Save changes to continue' );
				currentRestaurant[ 'menu' ][ `${ newCategory }` ] = {};
			}
		}
    }
							/** ** ** *
			Function : addItem() 
			Parametres : N/A
			Funcitonality : 
				Gets the value at the line of textboxes below the button 'Add Category', after it is clicked. 
				Gets the value of the dropbox of categories. 
				Saves the newly created item in the category chosen. 
				Saves these changes inside the variable currentRestaurant ( Global ) 
				Makes sure that all the values given are not blank. 
							* ** ** **/
	function addItem()
	{
		let uniqueID = 0; 
		newItem = document.getElementById( 'newItemName' ).value;
		newDescription = document.getElementById( 'newItemDescription' ).value;
		newPrice = document.getElementById( 'newItemPrice' ).value;
		chosenCategory = document.getElementById( 'menuCategories' ).value;
		if(( newItem == '' )||( newDescription == '' )||( newPrice == '' ))
		{
			alert( 'Must fill values. Changes not saved.' );
		}
		else if( chosenCategory == '' )
		{
			alert( 'Must have a category. Changes not saved.' );
		}
		else 
		{
			alert( 'Item added. Save changes to continue' );
			Object.keys( currentRestaurant[ 'menu' ] ).forEach( category => 
			{
				Object.keys( currentRestaurant[ 'menu' ][ category ]).forEach( item => 
				{
					uniqueID+=1;
				});
			});
			currentRestaurant[ 'menu' ][ `${ chosenCategory }` ][ `${ uniqueID }` ] = {
				'name':`${newItem}`,
				'description':`${newDescription}`,
				'price':`${newPrice}`
			}
		}
	}
							/** ** ** *
			Function : saveChanges() 
			Parametres : N/A
			Funcitonality : 
				Once the Save Changes button is clicked, 
				function sends a POST XMLHttpRequest to the server with the changed currentRestaurant ( Global ) variable. The server checks the array of restaurants in its database and looks for a matching ID. Once found, it makes the changes in the restaurants and updates the DataBase. Reloading the page, displaying the changes. 
							* ** ** **/
	function saveChanges()
	{
        let req = new window.XMLHttpRequest();
        req.open( 'POST', '/updateRestaurants', true );
        req.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
		req.send( JSON.stringify( currentRestaurant ));
		req.onload = () =>
		{
			alert( "Changes saved" );
		}
	}
	