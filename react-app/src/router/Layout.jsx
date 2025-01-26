import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { getAllSongs } from "../redux/songs";
import Navigation from "../components/Navigation/Navigation";
import Sidebar from "../components/Home/Sidebar";
import Playback from "../components/Playback/Playback";
import "../components/Home/home.css"

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate())
    dispatch(getAllSongs()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <ModalProvider>
        <Navigation />

        <div className="layout">
          <div className="sidebar">
            <Sidebar />
          </div>

          {isLoaded && <Outlet />}
        </div>

        <Playback />

        <Modal />
      </ModalProvider>
    </>
  );
}
