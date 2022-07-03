import useAxios from "./useAxios";

const useApiAccess = () => {
  const { postForm } = useAxios();

  const uploadImage = async (imageData) => {
    const formData = new FormData();
    formData.append("imageFile", imageData);

    const response = await postForm.post("api/camera/upload", formData);
    if (response.status === 200) return response.data;
    return {};
  };

  return { uploadImage };
};

export default useApiAccess;
