import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const anonymousSession = db.define("anonymous_session", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  sessionUUID: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  conversionComplete: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  downloadComplete: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  originalFilePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  convertedFilePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default anonymousSession;