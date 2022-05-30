import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UsuarioSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    senha: { type: String, required: true },
    adm: { type: Boolean, required: true, default: false },
  },
  { versionKey: false },
);

const Usuario = model('usuarios', UsuarioSchema);

export default Usuario;