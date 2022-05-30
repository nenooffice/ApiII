import mongoose from 'mongoose';
const { connect } = mongoose;

export const conectarAoDatabase = () => {
  connect('mongodb://localhost:27017/paletas-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.log(`Database connection error: ${err}`);
    });
};