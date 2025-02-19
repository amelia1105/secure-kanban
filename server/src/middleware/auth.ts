import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface for the JWT payload
interface JwtPayload {
  username: string;
}

// Middleware function to authenticate the token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);  // Debugging line

    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Verify the token using the secret key
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error('Token verification failed:', err);  // Debugging line
        return res.sendStatus(403);  // Forbidden if token verification fails
      }

      // Attach the user information to the request object
      req.user = user as JwtPayload;
      return next();  // Proceed to the next middleware or route handler
    });
  } else {
    console.error('No Authorization header found');
    return res.sendStatus(401);  // Unauthorized if no Authorization header is found
  }
  return;
};
