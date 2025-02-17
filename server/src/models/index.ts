import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      pool: {
        max: 10,          // Max number of connections in the pool
        min: 0,           // Min number of connections
        acquire: 30000,   // Max time (in ms) to wait for a connection before throwing an error
        idle: 10000,      // Max time (in ms) a connection can be idle before being released
      },
    })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      pool: {
        max: 10,          // Max number of connections in the pool
        min: 0,           // Min number of connections
        acquire: 30000,   // Max time (in ms) to wait for a connection before throwing an error
        idle: 10000,      // Max time (in ms) a connection can be idle before being released
      },
    });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

export { sequelize, User, Ticket };
