import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import {DebounceInput} from 'react-debounce-input';
import DB from "../../services/db.service";

function Images() {
  const [query, setQuery] = React.useState('');
  const [images, setImages] = React.useState([]);

  const handleQueryChange = (ev) => {
    const query = ev.target.value;
    setQuery(query)
    const queryParams = {
      query,
      sort: 'popular',
      orientation: 'horizontal'
    };
    if (query) {
      shutterstockService.getImages(queryParams).then((res: any) => {
        const data = res.data;
        setImages(data);
      })
    }
  }

  const handleImageClick = (imageId) => {
    if (DB.getInstance().images.find(image => image === imageId)) {
      alert('Image is already in the DB!');
      return;
    }
    DB.getInstance().images = [...DB.getInstance().images, imageId];
    alert(`Image with id: ${imageId} added succesfully!`);
  }

  const renderedImages = images.map((image: any, index) => {
    if (!(image && image.assets && image.assets.preview)) {
      return null
    }
    const {url, height, width} = image.assets.preview;
    return <div key={index} className='image-wrapper' onClick={() => handleImageClick(image.id)}>
      <img
        src={url}
        width={width}
        height={height}
        alt="new"
      />
    </div>
  })

  return (
    <div className="App">
      <h6>Images (click an image to add to DB)</h6>
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
          {renderedImages}
        </div>
      </div>
    </div>
  );
}

export default Images;
