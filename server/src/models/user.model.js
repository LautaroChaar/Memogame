import { model, Schema } from "mongoose";

const userSchema = new Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  games: {type: Array, required: true},
  trophies: {type: Number, required: true},
  token: {type: String, required: false} 
})

export const userModel = model('usuarios', userSchema);