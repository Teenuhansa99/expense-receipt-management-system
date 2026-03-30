import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { RegisterInput, LoginInput } from "../models/user.types";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as RegisterInput;

      const result = await authService.register({ email, password });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as LoginInput;

      const result = await authService.login({ email, password });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
