import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import {InputFactory} from './Input.js'


const User = UserFactory(sequelize);
const Input = InputFactory(sequelize);

User.hasMany(Input, { foreignKey: 'UserId'});
Input.belongsTo(User, { foreignKey: 'UserId', as: 'assignedUser'});

export { User, Input };