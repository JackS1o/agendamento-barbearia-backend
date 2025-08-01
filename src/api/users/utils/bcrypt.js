import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

export { hashPassword, comparePassword };
