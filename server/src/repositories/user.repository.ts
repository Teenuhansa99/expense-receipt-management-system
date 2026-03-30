import { pool } from "../config/db";
import { User, RegisterInput } from "../models/user.types";

const userRepository = {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },

  async findById(id: number): Promise<User | null> {
    try {
      const query = `SELECT * FROM users WHERE id = $1`;
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw error;
    }
  },

  async create(data: RegisterInput & { password: string }): Promise<User> {
    try {
      const query = `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id, email, password, created_at;
      `;

      const values = [data.email, data.password];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      if (error.code === "23505") {
        // Unique constraint violation
        throw new Error("Email already exists");
      }
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

export default userRepository;
