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

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar className="toolbar">
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
            <Link to="/tracks">Tracks</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Routes>
          <Route path="/" element={<Images/>} />
          <Route path="/images" element={<Images/>} />
          <Route path="/stored-images" element={<StoredImages/>} />
          <Route path="/videos" element={<Videos/>} />
          <Route path="/tracks" element={<Tracks/>} />
        </Routes>
      </div>
    </Router>
  );
}
