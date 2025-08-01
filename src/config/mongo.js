import mongoose from 'mongoose';

const connectToMongo = async () => {
  const mongoUri = process.env.DATABASE_URL;

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectToMongo;
