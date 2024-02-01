const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authToken = req.header("auth-token");
  if (!authToken) {
    return res.status(401).json({ success: false, error: "Access Denied!" });
  }

  try {
    const verifiedToken = jwt.verify(authToken, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
    //console.log(verifiedToken);
    next();
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
}

module.exports = verifyToken;
