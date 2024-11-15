import axios from "axios";

async function createMemeWithTelegram(memeItem, userInfo, tokenBot) {
  try {
    console.log("call createMemeWithTelegram", memeItem);
    const response = await axios({
      method: "post",
      url: "https://api.memelabs.org/v1/meme-proposals/create",
      data: {
        data: memeItem,
        userInfo: userInfo,
        tokenBot: tokenBot,
      },
    });

    console.log("Upload successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export { createMemeWithTelegram };
