import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import DB from "../../services/db.service";
import {Delete} from "@mui/icons-material";

function StoredTracks() {
  const [tracks, setTracks] = React.useState([]);
  React.useEffect(() => {
    shutterstockService.getTracksById({ids: DB.getInstance().tracks}).then((res: any) => {
      const data = res.data;
      setTracks(data);
    })
  }, []);

  const handleTrackClick = (trackId) => {
    DB.getInstance().tracks = DB.getInstance().tracks.filter(track => track !== trackId);
    alert(`Track with id: ${trackId} removed succesfully!`);
    shutterstockService.getTracksById({ids: DB.getInstance().tracks}).then((res: any) => {
      const data = res.data;
      setTracks(data);
    })
  }

  const renderedTracks = tracks.map((track: any, index) => {
    if (!(track && track.assets && track.assets.preview_mp3)) {
      return null;
    }
    const {url} = track.assets.preview_mp3;
    return <div key={index} className='item-wrapper'>
      <a href={url} target="_blank">{track.title}</a>
      <div className="action-wrapper" onClick={() => {handleTrackClick(track.id)}}>
        <Delete/>
      </div>
    </div>
  })

  return (
    <div className="App">
      <h6>Tracks by DB ids</h6>
      <div className="App-content">
        <div className='items' style={{flexDirection: 'column'}}>
          {renderedTracks}
        </div>
      </div>
    </div>
  );
}

export default StoredTracks;
