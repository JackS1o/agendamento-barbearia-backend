import { loginService } from '../services/index.js';

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
