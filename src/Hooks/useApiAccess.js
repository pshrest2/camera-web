import axios from "axios";

const useApiAccess = () => {
  if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = process.env.REACT_APP_CAMERA_API_URL_LOCAL;
  } else {
    axios.defaults.baseURL = process.env.REACT_APP_CAMERA_API_URL_PROD;
  }

  const uploadImage = async (imageData) => {
    const formData = new FormData();
    formData.append("imageFile", imageData);

    const response = await axios.post("/camera/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) return response.data;
    return {};
  };

  return { uploadImage };
};

export default useApiAccess;
