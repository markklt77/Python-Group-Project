import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import AlbumsPage from '../components/Albums';
import AlbumSongs from '../components/Albums'
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
            path: "/playlists",
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
