import axios from "axios";
export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      {
        type,
        background,
        text,
        images,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("post", data);
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const reactPost = async (postId, react, token, id) => {
  console.log(react);
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      {
        postId,
        react,
        id

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
