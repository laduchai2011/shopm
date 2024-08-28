'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

class DefineModel {
    constructor(){

        //---------------------------Member infro--------------------------------//
        this._Member = sequelize.define('Member', {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Members__id'
            },
            uuid_member: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            account: {
                type: DataTypes.STRING,
                allowNull: false, 
                unique: 'UQ__Members__account'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'UQ__Members__phone'
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: false
            },
            childCompany: {
                type: DataTypes.STRING,
                allowNull: false
            },
            department: {
                type: DataTypes.STRING,
                allowNull: false
            },
            office: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            // Other model options go here
        });

        this._Member_CH = sequelize.define('Member_CH', {
            // Model attributes are defined here
            account: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: false
            },
            childCompany: {
                type: DataTypes.STRING,
                allowNull: false
            },
            department : {
                type: DataTypes.STRING,
                allowNull: false
            },
            office: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_member: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_member_indexes',
                using: 'BTREE',
                fields: ['uuid_member']
            }]
        });
        this._Member.hasMany(this._Member_CH, { foreignKey: 'uuid_member' })
        this._Member_CH.belongsTo(this._Member, { foreignKey: 'uuid_member', targetKey: 'uuid_member', as: 'uuid_Member' })

        this._ChestGroup = sequelize.define('ChestGroup', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__ChestGroups__id'
            },
            uuid_chestGroup: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {})

        this._ChestGroup_CH = sequelize.define('ChestGroup_CH', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_member: {
                type: Sequelize.UUID,
                allowNull: false
            },
            uuid_chestGroup: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [
                {
                    name: 'uuid_member_indexes',
                    using: 'BTREE',
                    fields: ['uuid_member']
                },
                {
                    name: 'uuid_chestGroup_indexes',
                    using: 'BTREE',
                    fields: ['uuid_chestGroup']
                }
            ]
        })
        this._Member.hasMany(this._ChestGroup_CH, { foreignKey: 'uuid_member' })
        this._ChestGroup_CH.belongsTo(this._Member, { foreignKey: 'uuid_member', targetKey: 'uuid_member', as: 'uuid_Member' })
        this._ChestGroup.hasMany(this._ChestGroup_CH, { foreignKey: 'uuid_chestGroup' })
        this._ChestGroup_CH.belongsTo(this._ChestGroup, { foreignKey: 'uuid_chestGroup', targetKey: 'uuid_chestGroup', as: 'uuid_ChestGroup' })

        this._Chest = sequelize.define('Chest', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Chests__id'
            },
            uuid_chest: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false
            },
            maxAmount: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_departmentChest: {
                type: Sequelize.UUID,
                allowNull: true
            },
            uuid_chestGroup: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [
                {
                    name: 'uuid_departmentChest_indexes',
                    using: 'BTREE',
                    fields: ['uuid_departmentChest']
                },
                {
                    name: 'uuid_chestGroup_indexes',
                    using: 'BTREE',
                    fields: ['uuid_chestGroup']
                }
            ]
        })
        // this._DepartmentChest.hasMany(this._Chest, { foreignKey: 'uuid_departmentChest' })
        // this._Chest.belongsTo(this._DepartmentChest, { foreignKey: 'uuid_departmentChest', targetKey: 'uuid_departmentChest', as: 'uuid_DepartmentChest' })
        this._ChestGroup.hasMany(this._Chest, { foreignKey: 'uuid_chestGroup' })
        this._Chest.belongsTo(this._ChestGroup, { foreignKey: 'uuid_chestGroup', targetKey: 'uuid_chestGroup', as: 'uuid_ChestGroup' })

        this._Chest_CH = sequelize.define('Chest_CH', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false
            },
            maxAmount: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_member: {
                type: Sequelize.UUID,
                allowNull: false
            },
            uuid_chest: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [
                {
                    name: 'uuid_member_indexes',
                    using: 'BTREE',
                    fields: ['uuid_member']
                },
                {
                    name: 'uuid_chest_indexes',
                    using: 'BTREE',
                    fields: ['uuid_chest']
                }
            ]
        })
        this._Member.hasMany(this._Chest_CH, { foreignKey: 'uuid_member' })
        this._Chest_CH.belongsTo(this._Member, { foreignKey: 'uuid_member', targetKey: 'uuid_member', as: 'uuid_Member' })
        this._Chest.hasMany(this._Chest_CH, { foreignKey: 'uuid_chest' })
        this._Chest_CH.belongsTo(this._Chest, { foreignKey: 'uuid_chest', targetKey: 'uuid_chest', as: 'uuid_Chest' })

        sequelize.sync();
    }

    getMember() {
        return this._Member;
    }

    getMember_CH() {
        return this._Member_CH;
    }

    getChestGroup() {
        return this._ChestGroup;
    }

    getChestGroup_CH() {
        return this._ChestGroup_CH;
    }

    getChest() {
        return this._Chest;
    }

    getChest_CH() {
        return this._Chest_CH;
    }
}

const defineModel = new DefineModel();

module.exports = { defineModel }