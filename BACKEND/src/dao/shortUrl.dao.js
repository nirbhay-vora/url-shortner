import shortUrlSchema from "../model/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (url, shortUrl, userId) => {
  try {
    const newUrl = new shortUrlSchema({
      fullUrl: url,
      shortUrl: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }

    await newUrl.save();
  } catch (err) {
    if (err.code === 11000) throw new ConflictError("Short url already exist");
    throw new Error(err);
  }
};

export const findUrlFromShortUrl = async (shortUrl) => {
  const url = await shortUrlSchema.findOneAndUpdate(
    { shortUrl: shortUrl },
    { $inc: { clicks: 1 } }
  );
  return url;
};

export const getCustomShortUrl = async (slug) => {
  return await shortUrlSchema.findOne({ shortUrl: slug });
};
