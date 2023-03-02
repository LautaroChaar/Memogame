import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { config } from '../config/config.js';
import { logger } from "../config/configLogger.js";
import UserDaoMongoDB from '../models/daos/user/userDaoMongoDB.js';

const userApi = new UserDaoMongoDB();

const generateEncryptedPassword = async (password) => {
  const EncryptedPassword = await bcrypt.hash(password, 10);
  return EncryptedPassword;
}

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const oldUser = await userApi.getById(email);
    if (oldUser) {
      return res.status(409).send("User Already Exist.");
    }
    const user = {email: email.toLowerCase(), name, password: await generateEncryptedPassword(password), games: [{pokemon: {easy: 0, medium: 0, hard: 0}}, {numbers: {easy: 0, medium: 0, hard: 0}}], trophies: 0};
    await userApi.add(user);
    const token = jwt.sign(
      { user_id: user.id, email },
      config.server.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    user.token = token;
    res.set('Access-Control-Allow-Origin', '*').status(201).json(user);
  } catch (err) {
    logger.error(err);
  }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userApi.getById(email.toLowerCase());

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        config.server.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      user.token = token;
      res.status(200).set('Access-Control-Allow-Origin', '*').json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    logger.error(err);
  }
}