import { AppError } from '../../../errors/index.js';
import User from '../models/index.js';
import { hashPassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/generateToken.js';

export const createUserService = async (name, email, password) => {
  const userExists = await User.findOne({ email }).exec();

  if (userExists) {
    throw new AppError('User already exists', 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({ name, email, passwordHash });

  if (!user) {
    throw new AppError('User not created', 500);
  }

  const token = generateToken(user);

  return { token };
};
