import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import DB from "../../services/db.service";
import {Delete} from "@mui/icons-material";
import {Alert, Snackbar} from "@mui/material";

function StoredVideos() {
  const [open, setOpen] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  React.useEffect(() => {
    shutterstockService.getVideosById({ids: DB.getInstance().videos}).then((res: any) => {
      const data = res.data;
      setVideos(data);
    })
  }, []);

  const handleVideoClick = (videoId) => {
    DB.getInstance().videos = DB.getInstance().videos.filter(video => video !== videoId);
    shutterstockService.getVideosById({ids: DB.getInstance().videos}).then((res: any) => {
      const data = res.data;
      setVideos(data);
    });
    setOpen(true);
  }

  const renderedVideos = videos.map((video: any, index) => {
    if (!(video && video.assets && video.assets.preview_mp4)) {
      return null;
    }
    const {url} = video.assets.preview_mp4;
    return <div key={index} className='item-wrapper'>
      <a href={url} target="_blank">{video.description}</a>
      <div className="action-wrapper" onClick={() => {handleVideoClick(video.id)}}>
        <Delete/>
      </div>
    </div>
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="App">
      <h6>Videos by DB ids</h6>
      <div className="App-content">
        <div className='items' style={{flexDirection: 'column'}}>
          {renderedVideos}
        </div>
      </div>
      <Snackbar open={open}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={6000}
                onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          Video removed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StoredVideos;
