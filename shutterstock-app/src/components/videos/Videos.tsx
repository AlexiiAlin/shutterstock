import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import {DebounceInput} from 'react-debounce-input';
import DB from "../../services/db.service";
import {Add} from "@mui/icons-material";
import {Alert, Snackbar} from "@mui/material";

function Videos() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [videos, setVideos] = React.useState([]);

  const handleQueryChange = (ev) => {
    const query = ev.target.value;
    setQuery(query)
    const queryParams = {
      query,
      sort: 'popular',
      orientation: 'horizontal'
    };
    if (query) {
      shutterstockService.getVideos(queryParams).then((res: any) => {
        const data = res.data;
        setVideos(data);
      })
    }
  }

  const handleVideoClick = (videoId) => {
    if (DB.getInstance().videos.find(video => video === videoId)) {
      alert('Video is already in the DB!');
      return;
    }
    DB.getInstance().videos = [...DB.getInstance().videos, videoId];
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
        <Add/>
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
      <h6>Videos</h6>
      <DebounceInput
        className="query-input"
        minLength={2}
        type="text"
        onChange={handleQueryChange}
        debounceTimeout={500}
        value={query}
      />

      <div className="App-content">
        <div className='items' style={{flexDirection: 'column'}}>
          {renderedVideos}
        </div>
      </div>
      <Snackbar open={open}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={1000}
                onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          Video added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Videos;
