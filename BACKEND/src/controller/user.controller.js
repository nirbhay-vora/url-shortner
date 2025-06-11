import { getAllUserUrls } from "../dao/user.dao.js";
import { asyncHandler } from "../utils/tryCatchHandler.js";

export const getAllShortUrls = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const shortUrls = await getAllUserUrls(_id);
    return res.status(200).json({
        message : "All short URLs fetched successfully",
        urls : shortUrls
    })
})