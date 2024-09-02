import { v4 as uuidv4 } from "uuid";

const generateSessionId = (req, res, next) => {
  const sessionId = uuidv4();
  req.sessionId = sessionId;
  res.cookie("sessionId", `${sessionId}`, {
    maxAge: 3600000, // 1 hour
    httpOnly: true, // Cookie can't be accessed via JavaScript
    // secure: process.env.NODE_ENV === "production", // Only set cookie over HTTPS in production
    sameSite: "strict", // Cookie will be sent for same-site requests only
  });
  // console.log(res.cookie);
  next();
};

export default generateSessionId;
