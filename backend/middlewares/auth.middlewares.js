
const VerifyToken = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(401, "Unauthorized"));
    }
    req.user = decoded;
    next();
  });
};

export { VerifyToken };