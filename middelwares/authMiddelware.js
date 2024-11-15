const JWT = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    // Check if the authorization header exists
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        message: "Auth Failed: No authorization header",
        success: false,
      });
    }

    const token =  authHeader && authHeader.split(" ")[1]; // Extract the token
    
    if (!token) {
      return res.status(401).json({ message: 'Token missing, access denied' });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed: Invalid token",
          success: false,
        });
      } else {
        req.user= user; // Store user ID from token
        next(); // Proceed to the next middleware
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server error",
      success: false,
    });
  }
};

module.exports=authenticateToken;
