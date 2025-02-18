import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);  // Debugging line

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error('Token verification failed:', err);  // Debugging line
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    console.error('No Authorization header found');
    return res.sendStatus(401);
  }
  return;
};
