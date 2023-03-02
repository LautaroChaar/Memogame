import jwt from "jsonwebtoken";
import { config } from "../src/config/config.js";

export const verifyToken = (req, res, next) => {
  
  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
  
  if (!authHeader) {
    return res.status(401).json({
      error: 'authentication is required',
      datail: 'token not found'
    })
  }
  
  const token = authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({
      error: 'authentication is required',
      datail: 'invalid token format'
    })
  }

  try {
    req.user = jwt.verify(token, config.server.SECRET_KEY);
  } catch (err) {
    return res.status(403).json({
      error: 'invalid token',
      detail: 'insufficient access level for the requested resource'
    })
  }
  return next();
};
