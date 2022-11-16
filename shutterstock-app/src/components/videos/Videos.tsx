import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import {DebounceInput} from 'react-debounce-input';

function Videos() {
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

  const renderedVideos = videos.map((video: any, index) => {
    if (!(video && video.assets && video.assets.preview_mp4)) {
      return null
    }
    const {url, height, width} = video.assets.preview_mp4;
    return <div key={index} className='image-wrapper'>
      <a href={url} target="_blank">Video {index + 1}</a>
    </div>
  })

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
        <div className='images'>
          {renderedVideos}
        </div>
      </div>
    </div>
  );
}

export default Videos;
