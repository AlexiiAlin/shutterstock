import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import {DebounceInput} from 'react-debounce-input';

function Tracks() {
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

  const renderedTracks = tracks.map((track: any, index) => {
    if (!(track && track.assets && track.assets.preview_mp3)) {
      return null
    }
    const {url, height, width} = track.assets.preview_mp3;
    return <div key={index} className='image-wrapper'>
      <a href={url} target="_blank">Track {index + 1}</a>
    </div>
  })

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
        <div className='images'>
          {renderedTracks}
        </div>
      </div>
    </div>
  );
}

export default Tracks;
