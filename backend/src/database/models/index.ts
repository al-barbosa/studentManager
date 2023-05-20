import { Sequelize, Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';
import * as config from '../config/database';

export default new Sequelize(config);

class Users extends Model {
  declare id: number;
  declare email: string;
  declare name: string;
  declare password: string;
  declare total_time: number;
}

class Admins extends Model {
  declare id: number;
  declare email: string;
  declare name: string;
  declare password: string;
}

class Categories extends Model {
  declare id: number;
  declare name: string;
}

class UsersCategories extends Model {
  declare id: number;
}

class UserRequests extends Model {
  declare id: number;
  declare user_id: number;
  declare category_id: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  total_time: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

Admins.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'admins',
  timestamps: false,
});

Categories.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'categories',
  timestamps: false,
});

UserRequests.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  category_id: {
    type: INTEGER,
    allowNull: false,
  },
  user_id: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user_requests',
  timestamps: false,
});

UsersCategories.init({}, {
  underscored: true,
  sequelize: db,
  modelName: 'users_categories',
  timestamps: false,
});

Users.belongsToMany(Categories, { through: UsersCategories, as: 'category', foreignKey: 'user_id' })
Categories.belongsToMany(Users, { through: UsersCategories, as: 'users', foreignKey: 'categories_id' })

UserRequests.belongsTo(Users, { foreignKey: 'user_id', as: 'user' })
// Users.belongsTo(UserRequests);
UserRequests.belongsTo(Categories, { foreignKey: 'category_id', as: 'category' })
// Categories.belongsTo(UserRequests);

export { Users, Admins, Categories, UsersCategories, UserRequests }