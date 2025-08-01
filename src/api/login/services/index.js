import { AppError } from '../../../errors/index.js';
import User from '../../users/models/index.js';
import { comparePassword } from '../../users/utils/bcrypt.js';
import { generateToken } from '../../users/utils/generateToken.js';

export const loginService = async (email, password) => {
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const isMatch = await comparePassword(password, user.passwordHash);

  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken(user);

  return { token };
};
