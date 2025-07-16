import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@repo/backend-common/config"; 
// Extend Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        name: string;
      };
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res
      .status(401)
      .json({ message: "No token provided", success: false });
    return;
  }

  try {
    const jwtSecret = JWT_SECRET;
    if (!jwtSecret) {
      res
        .status(500)
        .json({ message: "JWT secret not configured", success: false });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
      email: string;
      name: string;
    };

    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid token", success: false });
    return;
  }
};

export default authenticate;    