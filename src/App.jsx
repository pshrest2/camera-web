import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useApiAccess from "./Hooks/useApiAccess";

import "./App.scss";

const App = () => {
  const [imageData, setImageData] = useState({});
  const { uploadImage } = useApiAccess();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await uploadImage(imageData.imageFile);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageData({
          ...imageData,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div className="app">
      {imageData.imageSrc && (
        <div className="image-container">
          <img alt="receipt" id="receipt-image" src={imageData.imageSrc} />
        </div>
      )}
      <div className="camera-container">
        <form
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
          method="post"
        >
          <div className="input-container">
            <input
              accept="image/*"
              type="file"
              capture="environment"
              onChange={handleImageUpload}
            />
          </div>
          <div className="button-container">
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
