import userRepository from "../repositories/user.repository";
import { RegisterInput, LoginInput, AuthResponse, UserPublic } from "../models/user.types";
import { ApiError } from "../utils/apiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || "7d";

// Ensure JWT_SECRET is set
if (!JWT_SECRET || JWT_SECRET.length < 10) {
  console.warn(
    "⚠️  JWT_SECRET is not set or too short. Please set JWT_SECRET in .env file."
  );
}

// Helper function to sign tokens
function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any);
}

// Helper function to verify tokens
function verifyJWT(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

// Helper function to exclude password from user object
const excludePassword = (user: any): UserPublic => {
  const { password, ...rest } = user;
  return rest;
};

export const authService = {
  async register(data: RegisterInput): Promise<AuthResponse> {
    // Validate input
    if (!data.email || !data.password) {
      throw new ApiError(400, "Email and password are required");
    }

    // Validate email format (simple check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new ApiError(400, "Invalid email format");
    }

    // Validate password length
    if (data.password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters");
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ApiError(409, "User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await userRepository.create({
      email: data.email,
      password: hashedPassword,
    });

    // Generate token
    const token = signToken({ userId: user.id, email: user.email });

    return {
      token,
      user: excludePassword(user),
    };
  },

  async login(data: LoginInput): Promise<AuthResponse> {
    // Validate input
    if (!data.email || !data.password) {
      throw new ApiError(400, "Email and password are required");
    }

    // Find user by email
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Generate token
    const token = signToken({ userId: user.id, email: user.email });

    return {
      token,
      user: excludePassword(user),
    };
  },

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = verifyJWT(token);
      return decoded;
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token");
    }
  },
};
export default authService;