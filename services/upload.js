import axios from "axios";

async function uploadImage(file) {
  const config = useRuntimeConfig();

  const formData = new FormData();
  formData.append("file", file); // 'image' should match your API's expected field name
  console.log("formdata", formData);

  try {
    const response = await axios.post(
      `https://cors-anywhere.herokuapp.com/${config.public.API_BASE_URL}/v1/file-management/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Upload successful:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export { uploadImage };