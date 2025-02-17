import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  console.log("Login request received:", req.body); // Debugging line

  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    console.log("User not found for username:", username); // Debugging line
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    console.log("Invalid password for user:", username); // Debugging line
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  console.log("User authenticated successfully:", username); // Debugging line
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
