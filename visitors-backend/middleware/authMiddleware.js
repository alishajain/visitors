const verifyAdminRole = (req, res, next) => {
    const user = req.user; // Decoded user data from JWT (which should be attached by a previous middleware)
  
    // Check if the user has an admin role
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }
  
    next(); // Continue to the next middleware/route handler
  };
  
  module.exports = { verifyAdminRole };
  