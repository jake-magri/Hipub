
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface InputAttributes {
    id: number;
    input: string;
}

interface InputCreationAttributes extends Optional<InputAttributes, 'id'> { }

// Define the User class extending Sequelize's Model
export class Input extends Model<InputAttributes, InputCreationAttributes> implements InputAttributes {
    public id!: number;
    public input!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export function InputFactory(sequelize: Sequelize): typeof Input {
    Input.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            input: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {

        tableName: 'inputs',  // Name of the table in PostgreSQL
        sequelize,
    }
    )
    return Input;
}