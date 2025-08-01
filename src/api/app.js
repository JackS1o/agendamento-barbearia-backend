import express from 'express';
import routes from './routes/index.js';
import { errorHandler } from '../errors/index.js';
import cors from 'cors';
import connectToMongo from '../config/mongo.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import morgan from 'morgan';
dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

app.use(morgan('dev'));

app.use(routes);

connectToMongo().then(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
  });
  setInterval(
    async () => {
      try {
        const res = await fetch(`${process.env.SELF_PING_URL}`);
        console.log(
          `[SELF-PING] ${new Date().toISOString()} - status: ${res.status}, message: ${res.statusText}`
        );
      } catch (err) {
        console.error(
          '[SELF-PING] Erro ao pingar a rota /health:',
          err.message
        );
      }
    },
    14 * 60 * 1000
  );
});

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

export default app;
