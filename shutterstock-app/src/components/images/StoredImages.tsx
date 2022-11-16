import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import DB from "../../services/db.service";
import {Alert, Snackbar} from "@mui/material";

function StoredImages() {
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    shutterstockService.getImagesById({ids: DB.getInstance().images}).then((res: any) => {
      const data = res.data;
      setImages(data);
    })
  }, []);

  const handleImageClick = (imageId) => {
    DB.getInstance().images = DB.getInstance().images.filter(image => image !== imageId);
    shutterstockService.getImagesById({ids: DB.getInstance().images}).then((res: any) => {
      const data = res.data;
      setImages(data);
    });
    setOpen(true);
  }

  const renderedImages = images.map((image: any, index) => {
    if (!(image && image.assets && image.assets.preview)) {
      return null
    }
    const {url, height, width} = image.assets.preview;
    return <div key={index}
                className='item-wrapper'
                style={{cursor: 'pointer'}}
                onClick={() => handleImageClick(image.id)}>
      <img
        src={url}
        width={width}
        height={height}
        alt="new"
      />
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
      <h6>Images by DB ids (click an image to remove)</h6>
      <div className="App-content">
        <div className='items'>
          {renderedImages}
        </div>
      </div>
      <Snackbar open={open}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={6000}
                onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          Image removed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StoredImages;
