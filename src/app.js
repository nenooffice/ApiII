import paletasRouter from './routes/paletas.routes';
import usuariosRouter from './routes/usuarios.routes';
import loginRouter from './routes/login.routes';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  return response.send('Hello World');
});

app.use('/paletas', paletasRouter);
app.use('/usuarios', usuariosRouter);
app.use('/login', loginRouter);

export default app;