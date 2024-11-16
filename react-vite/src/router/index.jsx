import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import AlbumsPage from '../components/Albums';
import AlbumSongs from '../components/Albums'
<<<<<<< HEAD
import PlaylistSongsPage from '../components/Playlists/PlaylistSongsPage';
import CreatePlaylistForm from '../components/Playlists/PlaylistForm';
=======
>>>>>>> 040b7baa96de58dc08e756fe429cc67d53f74d94
import PlaylistsPage from '../components/Playlists';
import AlbumAddSong from '../components/Albums/AlbumAddSong';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/albums",
            children: [
              {
                index: true,
                element: <AlbumsPage />
              },
              {
                path: "/albums/:albumId",
                element: <AlbumSongs/>
              },
              {
                path: "/albums/:albumId/add-songs",
                element: <AlbumAddSong />
              }
            ]
          },
          {
            path: "/playlists/:playlistId",
<<<<<<< HEAD
            element: <PlaylistSongsPage />
          },
          {
            path: "/playlistForm",  //FOR TESTING
            element: <CreatePlaylistForm/>
          },
          {
            path: "/playlists",
=======
>>>>>>> 040b7baa96de58dc08e756fe429cc67d53f74d94
            element: <PlaylistsPage />
          }
        ]
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
