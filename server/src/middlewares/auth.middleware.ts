import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { ApiError } from "../utils/apiError";
import { JwtPayload } from "../models/user.types";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new ApiError(401, "No authorization header provided"));
    }

    if (!authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Invalid authorization header format"));
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    if (!token) {
      return next(new ApiError(401, "No token provided"));
    }

    // Verify token
    const decoded = (await authService.verifyToken(token)) as JwtPayload;

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(401, "Token verification failed"));
    }
  }
};
