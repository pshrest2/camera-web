const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_CAMERA_API_URL_LOCAL;
  } else {
    return process.env.REACT_APP_CAMERA_API_URL_PROD;
  }
};

export default getBaseUrl;
