
# Spotify2
## About
Spotify2 is a remake of the original Spotify application with the same functionality. Logged-in users can upload songs, create albums and playlists, and like songs while everyone can play songs.


# Link to live site
https://spotify2-b6rv.onrender.com

# Linkedin
 https://www.linkedin.com/in/abraham-garcia-822a2a344/

# Screenshots of your app in action (once completed)
### Home Page
![spotify2-homepage](https://github.com/user-attachments/assets/cf8e28ed-7f4a-4eaf-a6ab-3d00f72db497)
### A User posting a song
![add-song-spotify](https://github.com/user-attachments/assets/125ad36f-47f8-430c-b596-603110a51ea0)



# List of techs/languages/plugins/APIs used
### Frameworks and Libraries
Python, Flask, JavaScript, React, Redux, CSS3, HTML5

### Database
Postgres

### Hosting
Render
   

# To-dos/future features
* I would want to add a post feature for brands and categories so that when a user doesn't see the brand/category that matches their drink they are able to select a different option that will allow them to add a new brand/category to make their post for.
* I want to allow the updating a post feature to be able to update the image being stored in aws.
* The home page will show the 6 most recent posts, but I also want to add a filter that allows the user to search for: oldest posts, highest and lowest rating drinks.


# Endpoints
All patch, posts and deletes have @login_required and/or flask_login's current_user associated with them for proper authentication that the user is in fact the owner of the post or review and that there is a user.

 ## Auth Routes /api/auth
   ### Authenticate User
   * Purpose: Checks whether the user is authenticated and returns that users information
   * Method: GET
   * URL: /api/auth/
   * Response:
```js
{ 
id: 1,
username: "demo-lition",
email: "demo@aa.io"
}
```
   * Error Response: Status code 401
```js
{'errors': {'message': 'Unauthorized'}}
```

   ### Login
   * Purpose: Logs in a user with the email and password combo 
   * Method: POST
   * URL: /api/auth/login
   * Response:
```js
{ 
id: 1,
username: "demo-lition",
email: "demo@aa.io"
}
```
   * Error Response: Status code 401
```js
{'errors': 'different error messages for incorrect password or email or invalid login'}
```

   ### Logout
   * Purpose: Logout a signed in user
   * Method: GET
   * URL: /api/auth/logout
   * Response:
```js
{ 
'message': 'User logged out'
}
```

   ### Signup
   * Purpose: Lets a user sign up for a new account and returns new user's data
   * Method: POST
   * URL: /api/auth/signup
   * Response:
```js
{ 
id: 1,
username: "demo-lition",
email: "demo@aa.io"
}
```
   * Error Response: Status code 401
```js
{'errors': 'different error messages for improper email and password '}
```

   ### Unauthorized
   * Purpose: Returns unauthorized JSON when flask-login authentication fails
   * Method: GET
   * URL: /api/auth/
   * Response: 401
```js
{'errors': {'message': 'Unauthorized'}}
```


 ## Users /api/users
   ### Users
   * Purpose: Returns data for all users
   * Method: GET
   * URL: /api/users/
   * Response:
```js
{'users': [
{
id: 1,
username: "demo-lition",
email: "demo@aa.io"
},
{
id: 2,
username: "Terry",
email: "terry23@aa.io"
}
]
}
```
   ### User
   * Purpose: Returns a specific user's data
   * Method: GET
   * URL: /api/users/:userId
   * Response:
```js
{
id: 1,
username: "demo-lition",
email: "demo@aa.io"
}
```

 ## Drinks /api/drinks
   ### Recent Drinks
   * Purpose: Returns a list of all the drinks from recent to oldest post
   * Method: GET
   * URL: /api/drinks/
   * Response:
```js
[
{
id: 23,
user_id: 3,
brand_id: 1,
category_id: 2,
name: 'modelo',
img: 'https://www.shutterstock.com/image-photo/marinettewiusaaug12019-single-bottle-bud-light-600nw-1469572235.jpg',
oz: 20,
alc: 4.4,
rating: 3,
cal: 120,
carbs: 23,
sodium: 23,
desc: 'This is a generic desc filler for this readme'
},
{
id: 22,
user_id: 3,
brand_id: 1,
category_id: 2,
name: 'modelo',
img: 'https://www.shutterstock.com/image-photo/marinettewiusaaug12019-single-bottle-bud-light-600nw-1469572235.jpg',
oz: 20,
alc: 4.4,
rating: 3,
cal: 120,
carbs: 23,
sodium: 23,
desc: 'This is a generic desc filler for this readme'
}
]
```
   * Error Response: Message wfor when there are no drinks posted
```js
{'message': 'There are currently no drinks posted'}
```

   ### All Categories
   * Purpose: Gets all of the categories
   * Method: GET
   * URL: /api/drinks/categories
   * Response:
```js
[
{
'id': 1,
'name': 'Wine'
},
{
'id': 2,
'name': 'Beer'
},
{
'id': 3,
'name': 'Vodka'
}
]
```
   ### Category Selection
   * Purpose: For when a user selects a category of beverages it will return a list of all the brands associated with that category
   * Method: GET
   * URL: /api/drinks/categories/:categoryId
   * Response:
```js
[
{
'id': 1,
'name': 'Modelo'
},
{
'id': 2,
'name': 'Franzia'
},
{
'id': 3,
'name': 'Ciroc'
}
]
```
   * Error Response:
```js
{'error': 'There are no categories just yet'} 404
{'error': 'There are no brands for this category just yet'} 404
```
   ### Brand Selection
   * Purpose: For when a user selects a brand of beverages, it will return a list
    of all the beverage posts under that brand
   * Method: GET
   * URL: /api/drinks/brands/:brandId
   * Response:
```js
[
{
id: 1,
user_id: 3,
brand_id: 1,
category_id: 2,
name: 'modelo',
img: 'https://www.shutterstock.com/image-photo/marinettewiusaaug12019-single-bottle-bud-light-600nw-1469572235.jpg',
oz: 20,
alc: 4.4,
rating: 3,
cal: 120,
carbs: 23,
sodium: 23,
desc: 'This is generic filler info for this readme'
},
{
id: 2,
user_id: 3,
brand_id: 1,
category_id: 2,
name: 'modelo',
img: 'https://www.shutterstock.com/image-photo/marinettewiusaaug12019-single-bottle-bud-light-600nw-1469572235.jpg',
oz: 20,
alc: 4.4,
rating: 3,
cal: 120,
carbs: 23,
sodium: 23,
desc: 'This is generic filler info for this readme'
}
]
```
   * Error Response:
```js
{'error': 'No Drinks are available for this brand yet} 404
{'error': 'there is no such brand just yet'} 404
```

   ### Selected Drink
   * Purpose: When a drink is selected then it provides all
    the details and reviews for that drink
   * Method: GET
   * URL: /api/drinks/:drinkId
   * Response:
```js
{
id: 1,
user_id: 3,
brand_id: 1,
category_id: 2,
name: 'modelo',
img: 'https://www.shutterstock.com/image-photo/marinettewiusaaug12019-single-bottle-bud-light-600nw-1469572235.jpg',
oz: 20,
alc: 4.4,
rating: 3,
cal: 120,
carbs: 23,
sodium: 23,
desc: 'This is generic filler info for this readme'
}
```
   * Error Response:
```js
{'error': 'How did you get here? A post for this drink does not exist'} 404
```
   ### Update Drink
   * Purpose: Update a drink post only if it
    is owned by the user
   * Method: PATCH
   * URL: /api/drinks/:drinkId
   * Response:
```js
{'message': 'Your post was update'}
```
   * Error Response:  @login_required and flask current_user utilized to secure there is a user and that they own that post
```js
{'error': 'Various errors will be listed here if there was incorrect data or no data sent to patch'} 400
```
   ### Delete Drink
   * Purpose: Delete a drink post only if it
    is owned by the user
   * Method: GET
   * URL: /api/drinks/:drinkId
   * Response:
```js
{'message': 'Your post has been deleted'}
This will also redirect to that post the user just made
```
   * Error Response:
```js
{'error': 'How did you get here? You need to be logged in to delete YOUR post'} 401
```
   ### Create Drink 
   * Purpose: This is for creating a drink post
   * Method: POSt
   * URL: /api/drinks/post-drink
   * Response:
```js
{'message': 'Your post was created'}
```
   * Error Response: I placed required tags in the frontend jsx form so that the users will always be required to fill in the data
```js
{'error': 'The brand does not match the category of drink'} 400
{"errors": "Invalid file type"} 400
{'error': 'Please log in or create an account in order to post your drink'} 401
```
 ## Reviews /api/reviews
   ### Post Review
   * Purpose: This is to make a review when selecting a post that doesn't belong to the user
   * Method: POST
   * URL: /api/reviews/:postId
   * Response:
```js
{'message': 'Your review was created'}
```
   * Error Response:
```js
{'error': 'The rating has to be a whole number between 1-5'} 401
{'error': 'You already have a review for this post'} 403
{'error': 'You cannot leave a review for your own drink'} 400
{'error': 'There is no post for you to make a review for'}, 404
{'error': 'Please log in or create an account in order to post your drink'}, 401
```
 ### Update Review
   * Purpose: This is to update the users review
   * Method: PATCH
   * URL: /api/reviews/user/:revId
   * Response:
```js
{'message': 'The review has been updated'}
```
   * Error Response:
```js
{'error': 'The rating has to be a whole number between 1-5'} 401
{'error': 'This review does not belong to you'} 403
{'error': 'There is no review found'} 404
```

 ### Delete Review
   * Purpose: This is to delete the users review
   * Method: DELETE
   * URL: /api/reviews/user/:revId
   * Response:
```js
{'message': 'Your review has been deleted'}
```
   * Error Response:
```js
{'error': 'This review does not belong to you'}), 403
{'error': 'There is no review found'}), 404
```
