import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import {DebounceInput} from 'react-debounce-input';
import DB from "../../services/db.service";
import {Add} from "@mui/icons-material";
import {Alert, Snackbar} from "@mui/material";

function Tracks() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [tracks, setTracks] = React.useState([]);

  const handleQueryChange = (ev) => {
    const query = ev.target.value;
    setQuery(query)
    const queryParams = {
      query,
      sort: 'score',
    };
    if (query) {
      shutterstockService.getTracks(queryParams).then((res: any) => {
        const data = res.data;
        setTracks(data);
      })
    }
  }

  const handleTrackClick = (trackId) => {
    if (DB.getInstance().tracks.find(track => track === trackId)) {
      alert('Track is already in the DB!');
      return;
    }
    DB.getInstance().tracks = [...DB.getInstance().tracks, trackId];
    setOpen(true);
  }

  const renderedTracks = tracks.map((track: any, index) => {
    if (!(track && track.assets && track.assets.preview_mp3)) {
      return null;
    }
    const {url} = track.assets.preview_mp3;
    return <div key={index} className='item-wrapper'>
      <a href={url} target="_blank">{track.title}</a>
      <div className="action-wrapper" onClick={() => {handleTrackClick(track.id)}}>
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
      <h6>Tracks</h6>
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
          {renderedTracks}
        </div>
      </div>
      <Snackbar open={open}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={6000}
                onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          Track added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Tracks;
