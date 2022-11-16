import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Images from "./components/images/Images";
import Videos from "./components/videos/Videos";
import Tracks from "./components/tracks/Tracks";
import {AppBar, Toolbar, Typography} from "@mui/material";
import StoredImages from "./components/images/StoredImages";
import StoredTracks from "./components/tracks/StoredTracks";
import StoredVideos from "./components/videos/StoredVideos";
import DB from "./services/db.service";

export default function App() {
  const clearDB = () => {
    DB.getInstance().clearDB();
    window.location.reload();
  }

  return (
    <Router>
      <AppBar position="static">
        <Toolbar className="toolbar-wrapper">
          <div className="toolbar">
            <Typography variant="h6" component="div">
              <Link to="/">Images</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/stored-images">Stored images</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/videos">Videos</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/stored-videos">Stored videos</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/tracks">Tracks</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/stored-tracks">Stored tracks</Link>
            </Typography>
          </div>
          <div style={{cursor: 'pointer'}} onClick={clearDB}>
            <Typography variant="h6" component="div">
              Clear DB
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <Routes>
          <Route path="/" element={<Images/>} />
          <Route path="/images" element={<Images/>} />
          <Route path="/stored-images" element={<StoredImages/>} />
          <Route path="/videos" element={<Videos/>} />
          <Route path="/stored-videos" element={<StoredVideos/>} />
          <Route path="/tracks" element={<Tracks/>} />
          <Route path="/stored-tracks" element={<StoredTracks/>} />
        </Routes>
      </div>
    </Router>
  );
}
