import { createShortUrlWithoutUserService, createShortUrlWithUserService } from "../services/shortUrl.service.js";
import { findUrlFromShortUrl } from "../dao/shortUrl.dao.js";
import { asyncHandler } from "../utils/tryCatchHandler.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if(req.user){
    shortUrl = await createShortUrlWithUserService(data.url, req.user._id,data.slug);
  }
  else{
    shortUrl = await createShortUrlWithoutUserService(data.url);
  }
  res.status(201).json({
    message: "Short URL created successfully",
    shortUrl: process.env.APP_URL + shortUrl,
  });
});

export const redirectFromShortUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  const url = await findUrlFromShortUrl(shortUrl);
  if (!url) throw new Error("Short url not found");
  if (url) {
    res.redirect(url.fullUrl);
  } else {
    res.status(404).send("Url not found");
  }
});
