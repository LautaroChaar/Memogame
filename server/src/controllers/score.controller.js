import { logger } from "../config/configLogger.js";
import UserDaoMongoDB from "../models/daos/user/userDaoMongoDB.js";

const userApi = new UserDaoMongoDB();

export const updateUserScore = async (req, res) => {
  try {
    const { email, trophies, games } = req.body;
    const data = {trophies, games};
    const dataUser = await userApi.update(email, data);
    res.set('Access-Control-Allow-Origin', '*').status(201).json(dataUser);
  } catch (err) {
    logger.error(err);
  }
}