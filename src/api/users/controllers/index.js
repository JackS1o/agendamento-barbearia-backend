import { createUserService } from '../services/index.js';

export const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await createUserService(name, email, password);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
