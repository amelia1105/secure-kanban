import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Function to handle user login
export const login = async (req: Request, res: Response) => {
  console.log("Login request received:", req.body); // Debugging line

  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ where: { username } });

  // If user not found, return 401 status
  if (!user) {
    return res.status(401).json({ message: 'User not found. Please check your credentials.' });
  }

  // Compare provided password with stored password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // If password is invalid, return 401 status
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid password. Please try again.' });
  }

  // Generate JWT token
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  console.log("User authenticated successfully:", username); // Debugging line
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
