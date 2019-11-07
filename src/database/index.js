import Sequelize from 'sequelize';

import Project from '../app/models/Project';

import databaseConfig from '../config/database';

const models = [Project];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
