import axios from "axios";
const instance = axios.create();

export const UploadImages = async (formData, path, token) => {
  try {
    const { data } = await instance.post(
      `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
      formData,
      { path },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
