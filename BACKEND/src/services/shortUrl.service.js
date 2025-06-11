import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.dao.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUserService = async (url) => {
  const shortUrl = generateNanoId(6);
  if(!shortUrl) throw new Error("Shorturl not generated")
  await saveShortUrl(url,shortUrl)
  return shortUrl;
};

export const createShortUrlWithUserService = async (url,userId,slug=null) => {
    const shortUrl = slug || generateNanoId(6);
    const existingUrl = await getCustomShortUrl(slug);
    if (existingUrl) {
      throw new Error("Short URL already exists");
    }
    await saveShortUrl(url,shortUrl,userId)
    return shortUrl;
  };
