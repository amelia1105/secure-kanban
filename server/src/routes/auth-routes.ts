import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // extract username and password
  const { username, password } = req.body;

  // find user by username
  const user = await User.findOne({
    where: { username },
  });

  // if user not found, send authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // compare provided password with hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // if password is invalid, send authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // get secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // generate JWT token for authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
