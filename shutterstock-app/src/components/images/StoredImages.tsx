import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import {DebounceInput} from 'react-debounce-input';
import DB from "../../services/db.service";

function StoredImages() {
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    shutterstockService.getImagesById({ids: DB.getInstance().images}).then((res: any) => {
      const data = res.data;
      setImages(data);
    })
  }, []);

  const handleImageClick = (imageId) => {
    DB.getInstance().images = DB.getInstance().images.filter(image => image !== imageId);
    alert(`Image with id: ${imageId} removed succesfully!`);
    shutterstockService.getImagesById({ids: DB.getInstance().images}).then((res: any) => {
      const data = res.data;
      setImages(data);
    })
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
      <h6>Images by DB ids (click an image to remove)</h6>
      <div className="App-content">
        <div className='images'>
          {renderedImages}
        </div>
      </div>
    </div>
  );
}

export default StoredImages;
