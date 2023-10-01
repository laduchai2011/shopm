const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

class DefineModel {
    constructor(){
        this._User = sequelize.define('User', {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Users__id'
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false, 
                unique: 'UQ__Users__user'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'UQ__Users__phone'
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
            }
        }, {
            // Other model options go here
        });

        this._SockerSMRoom = sequelize.define('SockerSMRoom', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__SockerSMRooms__id'
            },
            uuid_sockerSMRoom: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            room: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'UQ_SockerSMRooms__room'
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_user: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_user_indexes',
                using: 'BTREE',
                fields: ['uuid_user']
            }]
        })

        this._User.hasMany(this._SockerSMRoom, { foreignKey: 'uuid_user' })
        this._SockerSMRoom.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })
    
        sequelize.sync();
    }    

    getUser() {
        return this._User;
    }

    getSockerSMRoom() {
        return this._SockerSMRoom;
    }
}

const defineModel = new DefineModel();

module.exports = { defineModel }