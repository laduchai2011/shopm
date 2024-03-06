'use strict';
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

        this._Payment = sequelize.define('Payment', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Payments__id'
            },
            uuid_payment: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            information: {
                type: DataTypes.TEXT
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
        this._User.hasMany(this._Payment, { foreignKey: 'uuid_user' })
        this._Payment.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })

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

        this._Medication = sequelize.define('Medication', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Medications__id'
            },
            uuid_medication: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            object: {
                type: DataTypes.STRING,
                allowNull: false
            },
            symptom: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            note: {
                type: DataTypes.STRING,
                allowNull: false
            },
            catalog: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            information: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sold: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            discount: {
                type: DataTypes.FLOAT,
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
            status: {
                type: DataTypes.STRING,
                allowNull: false
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
        this._Provider.hasMany(this._Medication, { foreignKey: 'uuid_provider' })
        this._Medication.belongsTo(this._Provider, { foreignKey: 'uuid_provider', targetKey: 'uuid_provider', as: 'uuid_Provider' })

        // --------------------------------
        this._DoctorOrPharmacist = sequelize.define('DoctorOrPharmacist', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__DoctorOrPharmacist__id'
            },
            uuid_doctorOrPharmacist: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: false
            },
            sex: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            major: {
                type: DataTypes.STRING,
                allowNull: false
            },
            graduated: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            information: {
                type: DataTypes.TEXT,
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
                allowNull: false,
                unique: 'UQ__DoctorOrPharmacist_uuid_user'
            }
        }, {
            indexes: [{
                name: 'uuid_user_indexes',
                using: 'BTREE',
                fields: ['uuid_user']
            }]
        })
        this._User.hasOne(this._DoctorOrPharmacist, { foreignKey: 'uuid_user' })
        this._DoctorOrPharmacist.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })

        this._CaseRecord = sequelize.define('CaseRecord', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecords__id'
            },
            uuid_caseRecord: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            priceTotal: {
                type: DataTypes.INTEGER
            },
            pageTotal: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            report: {
                type: DataTypes.TEXT
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_doctorOrPharmacist: {
                type: Sequelize.UUID
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
            }, {
                name: 'uuid_doctorOrPharmacist_indexes',
                using: 'BTREE',
                fields: ['uuid_doctorOrPharmacist']
            }]
        })
        // this._User.hasMany(this._CaseRecord, { foreignKey: 'uuid_user' })
        // this._DoctorOrPharmacist.hasMany(this._CaseRecord, { foreignKey: 'uuid_doctorOrPharmacist' })
        this._CaseRecord.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })
        this._CaseRecord.belongsTo(this._DoctorOrPharmacist, { foreignKey: 'uuid_doctorOrPharmacist', targetKey: 'uuid_doctorOrPharmacist', as: 'uuid_DoctorOrPharmacist' })

        this._OrderMyself = sequelize.define('OrderMyself', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__OrderMyselfs__id'
            },
            uuid_orderMyself: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            priceTotal: {
                type: DataTypes.INTEGER
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
        this._User.hasMany(this._OrderMyself, { foreignKey: 'uuid_user' })
        this._OrderMyself.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })

        this._OrderMedication = sequelize.define('OrderMedication', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__OrderMedications__id'
            },
            uuid_orderMedication: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pageNumber: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_caseRecord: {
                type: Sequelize.UUID
            },
            uuid_orderMyself: {
                type: Sequelize.UUID
            },
            uuid_user: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [
                {
                    name: 'uuid_caseRecord_indexes',
                    using: 'BTREE',
                    fields: ['uuid_caseRecord']
                },
                {
                    name: 'uuid_orderMyself_indexes',
                    using: 'BTREE',
                    fields: ['uuid_orderMyself']
                },
                {
                    name: 'uuid_user_indexes',
                    using: 'BTREE',
                    fields: ['uuid_user']
                },
                {
                    unique: true,
                    fields: ['uuid_caseRecord', 'pageNumber']
                }
            ]
        })
        this._User.hasMany(this._OrderMedication, { foreignKey: 'uuid_user' })
        this._OrderMedication.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })
        // this._OrderMyself.hasMany(this._OrderMedication, { foreignKey: 'uuid_orderMyself' })
        this._OrderMedication.belongsTo(this._OrderMyself, { foreignKey: 'uuid_orderMyself', targetKey: 'uuid_orderMyself', as: 'uuid_OrderMyself' })
        // this._CaseRecord.hasMany(this._OrderMedication, { foreignKey: 'uuid_caseRecord' })
        this._OrderMedication.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })

        this._History = sequelize.define('History', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Historys__id'
            },
            uuid_history: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            step: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isCompleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_orderMedication: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [
                {
                    name: 'uuid_orderMedication_indexes',
                    using: 'BTREE',
                    fields: ['uuid_orderMedication']
                },
                {
                    unique: true,
                    fields: ['step', 'uuid_orderMedication']
                }
            ]
        })
        this._OrderMedication.hasOne(this._History, { foreignKey: 'uuid_orderMedication' })
        this._History.belongsTo(this._OrderMedication, { foreignKey: 'uuid_orderMedication', targetKey: 'uuid_orderMedication', as: 'uuid_OrderMedication' })

        this._Transport = sequelize.define('Transport', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Transports__id'
            },
            uuid_transport: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            information: {
                type: DataTypes.TEXT
            },
            cost: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_orderMedication: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: 'UQ__Transports__uuid_orderMedication'
            }
        }, {
            indexes: [{
                name: 'uuid_orderMedication_indexes',
                using: 'BTREE',
                fields: ['uuid_orderMedication']
            }]
        })
        this._OrderMedication.hasOne(this._Transport, { foreignKey: 'uuid_orderMedication' })
        this._Transport.belongsTo(this._OrderMedication, { foreignKey: 'uuid_orderMedication', targetKey: 'uuid_orderMedication', as: 'uuid_OrderMedication' })     

        this._PaymentMedication = sequelize.define('PaymentMedication', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__PaymentMedications__id'
            },
            uuid_paymentMedication: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            information: {
                type: DataTypes.TEXT
            },
            cost: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_orderMedication: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: 'UQ__PaymentMedications__uuid_orderMedication'
            }
        }, {
            indexes: [{
                name: 'uuid_orderMedication_indexes',
                using: 'BTREE',
                fields: ['uuid_orderMedication']
            }]
        })
        this._OrderMedication.hasOne(this._PaymentMedication, { foreignKey: 'uuid_orderMedication' })
        this._PaymentMedication.belongsTo(this._OrderMedication, { foreignKey: 'uuid_orderMedication', targetKey: 'uuid_orderMedication', as: 'uuid_OrderMedication' })

        this._MedicationsOfOrderMyself = sequelize.define('MedicationsOfOrderMyself', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__MedicationsOfOrderMyselfs__id'
            },
            uuid_medicationsOfOrderMyself: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            discount: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            cost: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_orderMyself: {
                type: Sequelize.UUID,
                allowNull: false
            },
            uuid_medication: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_orderMyself_indexes',
                using: 'BTREE',
                fields: ['uuid_orderMyself']
            }, {
                name: 'uuid_medication_indexes',
                using: 'BTREE',
                fields: ['uuid_medication']
            }]
        })
        // this._OrderMyself.hasMany(this._MedicationsOfOrderMyself, { foreignKey: 'uuid_orderMyself' })
        this._MedicationsOfOrderMyself.belongsTo(this._OrderMyself, { foreignKey: 'uuid_orderMyself', targetKey: 'uuid_orderMyself', as: 'uuid_OrderMyself' })
        // this._Medication.hasMany(this._MedicationsOfOrderMyself, { foreignKey: 'uuid_medication' })
        this._MedicationsOfOrderMyself.belongsTo(this._Medication, { foreignKey: 'uuid_medication', targetKey: 'uuid_medication', as: 'uuid_Medication' })


        sequelize.sync();
    }

    getUser() {
        return this._User;
    }

    getProvider() {
        return this._Provider;
    }

    getMedication() {
        return this._Medication;
    }

    getOrderMedication() {
        return this._OrderMedication;
    }

    getHistory() {
        return this._History;
    }

    getPaymentMedication() {
        return this._PaymentMedication;
    }

    getTransport() {
        return this._Transport;
    }

    getMedicationsOfOrderMyself() {
        return this._MedicationsOfOrderMyself;
    }
}

const defineModel = new DefineModel();

module.exports = { defineModel }