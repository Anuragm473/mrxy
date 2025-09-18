import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // set in .env.local

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
}

export function generateToken(user: IUser) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
