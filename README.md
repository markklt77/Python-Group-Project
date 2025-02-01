
# Spotify2
## About
Spotify2 is a remake of the original Spotify application with the same functionality. Logged-in users can upload songs, create albums and playlists, and like songs while everyone can play songs.


# Link to live site
https://spotify2-b6rv.onrender.com


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



 ## Songs /api/songs
   ### All Songs
   * Purpose: Returns a list of all songs and their likes
   * Method: GET
   * URL: /api/songs/
   * Response:
```js
[
{
id: 23,
title: "The Title of song",
url: "www.a-url-for-the-song.com",
artist_id: 2,
genre: 'rap',
album: 'The album name',
likes: [
{
id: 1,
artist_id: 7,
song_id: 23,
liked_at: 2025-01-30 12:00:00
},
{
id: 2,
artist_id: 3,
song_id: 23,
liked_at: 2025-01-30 12:00:00
}
],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
},
{
id: 26,
title: "The Title of song part 2",
url: "www.a-url-for-the-song-part-2.com",
artist_id: 8,
genre: 'pop',
album: 'The album name part 2',
likes: [
{
id: 1,
artist_id: 4,
song_id: 26,
liked_at: 2025-01-30 12:00:00
},
{
id: 2,
artist_id: 10,
song_id: 26,
liked_at: 2025-01-30 12:00:00
}
],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
},
]
```

   ### Specific Song
   * Purpose: Get a specific song
   * Method: GET
   * URL: /api/songs/:songId
   * Response:
```js
{
id: 23,
title: "The Title of song",
url: "www.a-url-for-the-song.com",
artist_id: 2,
genre: 'rap',
album: 'The album name',
likes: [
{
id: 1,
artist_id: 7,
song_id: 23,
liked_at: 2025-01-30 12:00:00
},
{
id: 2,
artist_id: 3,
song_id: 23,
liked_at: 2025-01-30 12:00:00
}
],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
}
```
   * Error Response:
```js
{'errors': {'message': "Couldn't find song"}} 404
```
   ### Upload Song
   * Purpose: A logged in user can add a song
   * Method: POST
   * URL: /api/songs/upload-song
   * Response:
```js
{
id: 23,
title: "The Title of song",
url: "www.a-url-for-the-song.com",
artist_id: 2,
genre: 'rap',
album: 'The album name',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
}
```
   * Error Response:
```js
{'error': 'Various errors that might be brought up from the form submission'} 400
```
   ### Edit a Song 
   * Purpose: A logged in user can edit/update a song if it is theirs 
   * Method: PUT
   * URL: /api/songs/:songId
   * Response:
```js
{
id: 23,
title: "The Title of song",
url: "www.a-url-for-the-song.com",
artist_id: 2,
genre: 'rap',
album: 'The album name',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
}
```
   * Error Response:
```js
{'errors': {'message': "Couldn't find song"}}, 404
{'errors': {'message': 'Unauthorized'}}, 401
{'error': 'Various errors that might be brought up from the form submission'} 400

```

   ### Delete a Song
   * Purpose: 
   * Method: DELETE
   * URL: /api/songs/:songId
   * Response:
```js
{"message": "Song deleted successfully"}
```
   * Error Response:
```js
{"error": {"Song not found"}}, 404
{"errors": "Failed to remove the file from S3"}, 500
{"error": {"You do not have permission to delete this song"}}, 403
```
   ### Like a song
   * Purpose: A logged in user can like a song
   * Method: POST
   * URL: /api/songs/:songId/likes
   * Response:
```js
{'message': "Success"}
```
   ### Unlike a Song
   * Purpose: A logged in user can unlike a song
   * Method: DELETE
   * URL: /api/songs/:songId/likes
   * Response:
```js
{'message': "Successfully deleted"}
```
   * Error Response:
```js
{"error": {"You do not have permission to delete this like"}}, 403
{"error": {"Like not found"}}, 404
```


 ## Playlists /api/users/playlists
   ### Get User's Playlist 
   * Purpose: Get all playlists for the current user
   * Method: GET
   * URL: /api/users/playlists/test
   * Response:
```js
[
{
id: 1
name: 'playlist name 1'
user_id: 1
songs: [
{
id: 23,
title: "The Title of song",
url: "www.a-url-for-the-song.com",
artist_id: 2,
genre: 'rap',
album: 'The album name',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
},
{
id: 24,
title: "The Title of song2",
url: "www.a-url-for-the-song2.com",
artist_id: 3,
genre: 'rap',
album: 'The album name2',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
}
]
},
{
id: 2
name: 'playlist name 2'
user_id: 1
songs: [
{
id: 23,
title: "The Title of song",
url: "www.a-url-for-the-song.com",
artist_id: 2,
genre: 'rap',
album: 'The album name',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
},
{
id: 24,
title: "The Title of song2",
url: "www.a-url-for-the-song2.com",
artist_id: 3,
genre: 'rap',
album: 'The album name2',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
}
]
}
]
```

 ### Get Specific Playlist
   * Purpose: Get a single playlist by ID if it belongs to current user
   * Method: GET
   * URL: /api/users/playlists/:playlistId
   * Response:
```js
{
id: 1
name: 'playlist name 1'
user_id: 1
songs: [
{
id: 23,
title: "The Title of song",
url: "www.a-url-for-the-song.com",
artist_id: 2,
genre: 'rap',
album: 'The album name',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
},
{
id: 24,
title: "The Title of song2",
url: "www.a-url-for-the-song2.com",
artist_id: 3,
genre: 'rap',
album: 'The album name2',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
}
]
}
```
   * Error Response:
```js
{'error': 'Playlist not found'}, 404
```

 ### Create Playlist
   * Purpose: Create a new Playlist for the current user 
   * Method: POST
   * URL: /api/user/playlists/test
   * Response:
```js
{
id: 1
name: 'playlist name 1'
user_id: 1
songs: []
}
```
   * Error Response:
```js
{'error': 'Various errors that might be brought up from the form submission'} 400
```

 ### Delete Playlist
   * Purpose: Delete a playlist if the user owns it
   * Method: DELETE
   * URL: /api/user/playlists/:playlistId
   * Response:
```js
{'message': 'Playlist deleted successfully'}
```
   * Error Response:
```js
{'error': 'Playlist not found'}, 404
{'error': 'You do not have permission to delete this playlist'}, 403
```

 ### Add a Song to Playlist
   * Purpose: Add a song to an existing playlist 
   * Method: POST
   * URL: /api/user/playlists/:playlistId/songs/:songId
   * Response:
```js
{'message': 'Song added to playlist', 'playlist':{
id: 1
name: 'playlist name 1'
user_id: 1
songs: [
{
id: 24,
title: "The Title of song2",
url: "www.a-url-for-the-song2.com",
artist_id: 3,
genre: 'rap',
album: 'The album name2',
likes: [],
created_at: 2025-01-30 12:00:00,
updated_at: 2025-01-30 12:00:00
}]
}}
```
   * Error Response:
```js
{'error': 'Playlist not found'}, 404
{'error': 'Song not found'}, 404
```

 ### Remove a Song to Playlist
   * Purpose: Remove a song from an existing playlist 
   * Method: DELETE
   * URL: /api/user/playlists/:playlistId/songs/:songId
   * Response:
```js
{'message': 'Song removed to playlist', 'playlist':{
id: 1
name: 'playlist name 1'
user_id: 1
songs: []
}}
```
   * Error Response:
```js
{'error': 'Playlist not found'}, 404
{'error': 'Song not found'}, 404
{'error': 'Song is not in the specified playlist'}, 404
{'error': 'You do not have permission to remove songs from this playlist'}, 403
```
