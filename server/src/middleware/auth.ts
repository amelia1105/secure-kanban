import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // get authorization header from request
  const authHeader = req.headers.authorization;

  // if authorization header is present, extract token from it
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // get secret key from env variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // verify the JWT token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      // attach user info to request object
      req.user = user as JwtPayload;
      return next();
    });
    
    // if no authorization header is present, send unauthorized status
  } else {
    res.sendStatus(401);
  }
};
