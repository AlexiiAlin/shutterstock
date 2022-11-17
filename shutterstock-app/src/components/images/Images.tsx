import React from 'react';
import '../../App.css';
import shutterstockService from '../../services/shutterstock.service';
import {DebounceInput} from 'react-debounce-input';
import DB from "../../services/db.service";
import {Alert, Snackbar} from "@mui/material";

function Images() {
  const [open, setOpen] = React.useState(false);
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
        <div className='items'>
          {renderedImages}
        </div>
      </div>
      <Snackbar open={open}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={1000}
                onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          Image added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Images;
