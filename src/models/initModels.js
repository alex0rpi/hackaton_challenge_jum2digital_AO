import Sequelize, { DataTypes } from 'sequelize';
import mysqlConfig from '../config/configMysql.js';

import _Users from './user.js';
import _Skins from './skin.js';

import { designDB } from '../config/createMysqldb.js';

const sequelize = new Sequelize(
  mysqlConfig.name,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    define: { freezeTableName: true },
    logging: false,
  }
);

function initModels(sequelize) {
  const User = _Users(sequelize, DataTypes);
  const Skin = _Skins(sequelize, DataTypes);
  User.hasMany(Skin, { foreignKey: 'userId' });
  return {
    User,
    Skin,
  };
}

const { User, Skin } = initModels(sequelize);

const initDB = async () => {
  try {
    await designDB();
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Mysql DB successfully connected.');
  } catch (error) {
    console.log(error.message);
    console.log('There was an error connecting with the database');
    process.exit(1);
  }
};

export { User, Skin, initDB as default };
