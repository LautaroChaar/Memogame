import mongoose from "mongoose";
import { config } from "../config/config.js";
import { logger } from "../config/configLogger.js";
import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";

mongoose.set('strictQuery', true);

let instance = null;

class MongoDBClient extends DBClient {
  constructor(){
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect(){
    try {
      await this.client.connect(config.atlas.strConn);
      this.connected = true
      logger.info('Data base connected');
    } catch (error) {
      throw new CustomError(500, "Error connecting to MongoDB", error);
    }
  }

  async disconnect(){
    try {
      await this.client.connection.close();
      this.connected = false;
      logger.info('Data base disconnected');
    } catch (error) {
      throw new CustomError(500, "Error disconnecting to MongoDB", error);
    }
  }
  static getInstance() {
    if (!instance) {
      instance = new MongoDBClient();
    }
    return instance;
  }
}

export default MongoDBClient;