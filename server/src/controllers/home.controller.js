import UserDaoMongoDB from "../models/daos/user/userDaoMongoDB.js";

const userApi = new UserDaoMongoDB();

export const getUserData = async (req, res) => {
  try {
    const email = req.params.user;
    const dataUser = await userApi.getById(email);
    res.set('Access-Control-Allow-Origin', '*').status(201).json(dataUser);
  } catch (err) {
    logger.error(err);
  }
}