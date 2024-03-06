const {DataTypes} = require('sequelize');
const {sequelize} = require("../db/database");

const Todo = sequelize.define('todo',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING
    },
    completed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Users',
            key: 'id'
        },
        allowNull: false
    }
})

module.exports = Todo;