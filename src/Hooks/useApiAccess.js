import axios from "axios";
import getBaseUrl from "../Helpers/getBaseUrl";

const useApiAccess = () => {
  const uploadImage = async (imageData) => {
    const formData = new FormData();
    formData.append("imageFile", imageData);

    const response = await axios.post(
      `${getBaseUrl()}/api/camera/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) return response.data;
    return {};
  };

  return { uploadImage };
};

export default useApiAccess;
