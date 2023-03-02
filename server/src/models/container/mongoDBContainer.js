import CustomError from '../../class/CustomError.class.js';
import MongoDBClient from '../../class/MongoDBClient.class.js';
import { logger } from '../../config/configLogger.js';


class MongoDBContainer {
  constructor(model) {
    this.model = model;
    this.conn = MongoDBClient.getInstance();
  }

  getAll = async () => {
    try {
      await this.conn.connect();
      return await this.model.find();
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Get all', 'Error completing the request.');
    } finally {
      await this.conn.disconnect();
    }
  }

  getById = async id => {
    try {
      await this.conn.connect();
      if (await this.model.find({id: id}) == false) {
        throw new CustomError(404, 'Get by id', 'Element not found');
      } else {
        let res = await this.model.find({id: id});
        return res[0];
      }
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Get by id', 'Error completing the request.');
    } finally {
      await this.conn.disconnect();
    }
  }

  add = async elem => {
    try {
      const timestamp = new Date().toLocaleString();
      await this.conn.connect(); 
      const objs = await this.model.find();
      let id;
      if (objs.length === 0) {
          id = 1;
      } else {
          id = objs[objs.length - 1].id + 1;
      }
      const obj =  { ...elem, timestamp, id };
      await this.model.create(obj);
      return (obj);
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Add', 'Error completing the request.');
    }  finally {
      await this.conn.disconnect();
    }
  }

  update = async elem => {
    try {
      await this.conn.connect();
      const id = Number(elem.id);
      if (await this.model.find({id: id}) == false) {
        throw new CustomError(404, 'Update', 'Element not found.');
      } else {
        await this.model.updateOne({id: id}, {$set: {...elem}});
        return elem;
      }
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Update', 'Error completing the request.');
    } finally {
      await this.conn.disconnect();
    }
  }

  deleteById = async id => {
    try {
      await this.conn.connect();
      if (await this.model.find({id: id}) == false) {
        throw new CustomError(404, 'Delete By Id', 'Element not found.');
      } else {
        await this.model.deleteOne({id: id});
        return (`Element ${id} removed successfully!`);
      }
    } catch (error) {
      logger.error(error);
      throw new CustomError(500, 'Delete By Id', 'Error completing the request.');
    } finally {
      await this.conn.disconnect();
    }
  }
}

export default MongoDBContainer;