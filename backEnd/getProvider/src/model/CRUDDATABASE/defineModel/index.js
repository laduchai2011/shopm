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

        this._Provider = sequelize.define('Provider', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Providers__id'
            },
            uuid_provider: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING
            },
            banner: {
                type: DataTypes.STRING
            },
            follow: {
                type: DataTypes.INTEGER,
                allowNull: false
            }, 
            averageRating: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            rateCount: {
                type: DataTypes.INTEGER,
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
        });
        this._User.hasMany(this._Provider, { foreignKey: 'uuid_user' })
        this._Provider.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })

        this._ProviderAbout = sequelize.define('ProviderAbout', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__ProviderAbouts__id'
            },
            uuid_providerAbout: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING
            },
            uuid_provider: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_provider_indexes',
                using: 'BTREE',
                fields: ['uuid_provider']
            }]
        })
        this._Provider.hasMany(this._ProviderAbout, { foreignKey: 'uuid_provider' })
        this._ProviderAbout.belongsTo(this._Provider, { foreignKey: 'uuid_provider', targetKey: 'uuid_provider', as: 'uuid_Provider' })

        sequelize.sync();
    }

    getUser() {
        return this._User;
    }

    getProvider() {
        return this._Provider;
    }

    getProviderAbout() {
        return this._ProviderAbout;
    }
}

const defineModel = new DefineModel();

module.exports = { defineModel }