# Likes

1. ? likes_routes not integrated to app ?
2. Needs error handling
3. artistId can be extrapolated from current_user
4. "AttributeError: 'Request' object has no attribute 'JSON'"
    - LIKE A SONG
    - Should be lower case 'json'
5. Like can only have 1 positional argument
    - Swap for kwargs
6. Cannot delete like

# albums

2. ? Cannot view songs on "/albums/albumId" ? - 
3. Cannot remove album - may not be a bug
4. Getting 404 instead of 401 - add song to album that doesn't belong to you
5. Getting 404 when trying to add any song to album

# playlists

1. Getting 404 for unauthorized deletion

# songs

1. Functions need descriptions
2. Must add likes to individual songs
