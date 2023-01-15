import React, { useState } from "react";
import useApiAccess from "./Hooks/useApiAccess";
import BackgroundContainer from "./Components/BackgroundContainer";
import CustomButton from "./Components/CustomButton";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const App = () => {
  const [imageData, setImageData] = useState({});
  const [uploading, setUploading] = useState(false);
  const { uploadImage } = useApiAccess();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      await uploadImage(imageData.imageFile);
      toast.success("Image sent to your main device!");
    } catch (err) {
      toast.error("Sorry there was an issue. Please try again later!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setUploading(false);
    }
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
    <BackgroundContainer className="app">
      <div className="intro">Upload your receipt from phone</div>

      <div className="camera-container">
        <form
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
          method="post"
        >
          <div className="buttons-container">
            <input
              accept="image/*"
              type="file"
              capture="environment"
              onChange={handleImageUpload}
              id="actual-btn"
              hidden
            />
            <label htmlFor="actual-btn">Choose Image</label>

            {imageData.imageSrc && (
              <CustomButton
                variant="success"
                type="submit"
                disabled={uploading}
                shadow
              >
                Upload
              </CustomButton>
            )}
          </div>
        </form>
      </div>

      {imageData.imageSrc && (
        <div className="image-container">
          <img alt="receipt" id="receipt-image" src={imageData.imageSrc} />
        </div>
      )}
      <ToastContainer />
    </BackgroundContainer>
  );
};

export default App;
