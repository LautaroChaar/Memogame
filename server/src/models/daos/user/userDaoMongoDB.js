import CustomError from '../../../class/CustomError.class.js';
import { logger } from '../../../config/configLogger.js';
import MongoDBContainer from '../../container/mongoDBContainer.js';
import { userModel } from '../../user.model.js';


class UserDaoMongoDB extends MongoDBContainer {
  constructor() {
    super(userModel);
  }

  getById = async (email) => {
    try {
      await this.conn.connect();
      if (await this.model.find({email: email}) == false) {
        return false;
      } else {
        let res = await this.model.find({email: email});
        return res[0];
      }
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Get By Id', 'Error completing the request.');
    } finally {
      await this.conn.disconnect();
    }
  }

  add = async (data) => {
    try {
      await this.conn.connect();
      const objs = await this.model.find();
      let id;
      if (objs.length === 0) {
        id = 1;
      } else {
        id = objs[objs.length - 1].id + 1;
      }
      const obj =  { ...data, id };
      await this.model.create(obj);
      return ({msg: `Registered user successfully!`});
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Add User', 'Error completing the request.');
    } finally {
      await this.conn.disconnect();
    }
  }

  update = async (email, data) => {
    try {
      await this.conn.connect();
      await this.model.updateOne({email: email}, {$set: {...data}});
      let res = await this.model.find({email: email});
      return res[0];
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Update', 'Error completing the request.');
    } finally {
      await this.conn.disconnect();
    }
  }
}

export default UserDaoMongoDB;