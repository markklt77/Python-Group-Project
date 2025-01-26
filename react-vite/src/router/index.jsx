import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import AlbumsPage from '../components/Albums';
// import AlbumSongs from '../components/Albums'
import PlaylistSongsPage from '../components/Playlists/PlaylistSongsPage';
// import CreatePlaylistForm from '../components/Playlists/PlaylistForm';
import PlaylistsPage from '../components/Playlists';
import ManageSongs from '../components/ManageSongs/ManageSongs';
// import AlbumAddSong from '../components/Albums/AlbumAddSong';

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
                element: <AlbumsPage />
              }
            ]
          },
          {
            path: "/playlists",
            element: <PlaylistsPage/>
          },

          {
            path: "playlists/:playlistId",
            element: <PlaylistSongsPage/>
          },
          {
            path: '/manage-songs',
            element: <ManageSongs />
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
