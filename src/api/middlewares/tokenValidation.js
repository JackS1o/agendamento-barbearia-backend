import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/index.js';
import User from '../../api/users/models/index.js';
import mongoose from 'mongoose';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not defined');
    }

    const decoded = jwt.verify(token, secret);

    if (!decoded?.id || !mongoose.Types.ObjectId.isValid(decoded.id)) {
      return next(new AppError('Invalid token payload', 400));
    }

    const user = await User.findById(decoded.id).exec();

    if (!user) {
      return next(new AppError('Unauthorized', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    const isDev = process.env.NODE_ENV !== 'production';
    if (err.name === 'TokenExpiredError') {
      return next(new AppError(isDev ? 'Token expired' : 'Unauthorized', 401));
    } else if (err.name === 'JsonWebTokenError') {
      return next(new AppError(isDev ? 'Invalid token' : 'Unauthorized', 401));
    }
    return next(new AppError('Authentication error', 401));
  }
};
