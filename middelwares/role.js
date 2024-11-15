const role = (requiredRole) => (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
  
  module.exports = { role };
  