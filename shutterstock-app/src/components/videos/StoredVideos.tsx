import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import DB from "../../services/db.service";
import {Delete} from "@mui/icons-material";

function StoredVideos() {
  const [videos, setVideos] = React.useState([]);
  React.useEffect(() => {
    shutterstockService.getVideosById({ids: DB.getInstance().videos}).then((res: any) => {
      const data = res.data;
      setVideos(data);
    })
  }, []);

  const handleVideoClick = (videoId) => {
    DB.getInstance().videos = DB.getInstance().videos.filter(video => video !== videoId);
    alert(`Video with id: ${videoId} removed succesfully!`);
    shutterstockService.getVideosById({ids: DB.getInstance().videos}).then((res: any) => {
      const data = res.data;
      setVideos(data);
    })
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
  })

  return (
    <div className="App">
      <h6>Videos by DB ids</h6>
      <div className="App-content">
        <div className='items' style={{flexDirection: 'column'}}>
          {renderedVideos}
        </div>
      </div>
    </div>
  );
}

export default StoredVideos;
