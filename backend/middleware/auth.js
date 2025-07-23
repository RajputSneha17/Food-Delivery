import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
