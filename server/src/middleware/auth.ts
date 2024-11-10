import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the JWT payload (now includes both username and user ID)
export interface JwtPayload {
  username: string;
  user: number; // user ID should be a number (integer)
}

// Middleware function to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader) {
    // Extract the token from the authorization header (Bearer token)
    const token = authHeader.split(' ')[1];

    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Verify the JWT token
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403); // Send forbidden status if the token is invalid
      }

      // Attach the user information (decodedToken) to the request object
      // Cast decodedToken as JwtPayload to ensure correct type
      req.user = decodedToken as JwtPayload;

      return next(); // Call the next middleware function
    });
  } else {
    res.sendStatus(401); // Send unauthorized status if no authorization header is present
  }
};
