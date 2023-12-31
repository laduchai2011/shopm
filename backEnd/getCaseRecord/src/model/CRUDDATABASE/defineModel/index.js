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
            status: {
                type: DataTypes.STRING,
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

        this._CaseRecordDescription = sequelize.define('CaseRecordDescription', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecordDescription__id'
            },
            uuid_caseRecordDescription: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            pageNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_caseRecord: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_caseRecord_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecord']
            }]
        })
        this._CaseRecord.hasMany(this._CaseRecordDescription, { foreignKey: 'uuid_caseRecord' })
        this._CaseRecordDescription.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })

        this._CaseRecordImage = sequelize.define('CaseRecordImage', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecordImage__id'
            },
            uuid_caseRecordImage: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            pageNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING
            },
            title: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_caseRecord: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_caseRecord_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecord']
            }]
        })
        this._CaseRecord.hasMany(this._CaseRecordImage, { foreignKey: 'uuid_caseRecord' })
        this._CaseRecordImage.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })

        this._CaseRecordVideo = sequelize.define('CaseRecordVideo', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecordVideo__id'
            },
            uuid_caseRecordVideo: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            pageNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            videos: {
                type: Sequelize.TEXT
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_caseRecord: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_caseRecord_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecord']
            }]
        })
        this._CaseRecord.hasMany(this._CaseRecordVideo, { foreignKey: 'uuid_caseRecord' })
        this._CaseRecordVideo.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })

        this._CaseRecordPrescription = sequelize.define('CaseRecordPrescription', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecordPrescription__id'
            },
            uuid_caseRecordPrescription: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            pageNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            prescription: {
                type: Sequelize.TEXT
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_caseRecord: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_caseRecord_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecord']
            }]
        })
        this._CaseRecord.hasMany(this._CaseRecordPrescription, { foreignKey: 'uuid_caseRecord' })
        this._CaseRecordPrescription.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })

        this._CaseRecordMedication = sequelize.define('CaseRecordMedication', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecordMedication__id'
            },
            uuid_caseRecordMedication: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            pageNumber: {
                type: DataTypes.STRING,
                allowNull: false
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
            uuid_caseRecord: {
                type: Sequelize.UUID,
                allowNull: false
            },
            uuid_medication: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_caseRecord_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecord']
            }, {
                name: 'uuid_medication_indexes',
                using: 'BTREE',
                fields: ['uuid_medication']
            }]
        })
        this._CaseRecord.hasMany(this._CaseRecordMedication, { foreignKey: 'uuid_caseRecord' })
        this._CaseRecordMedication.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })
        this._Medication.hasMany(this._CaseRecordMedication, { foreignKey: 'uuid_medication' })
        this._CaseRecordMedication.belongsTo(this._Medication, { foreignKey: 'uuid_medication', targetKey: 'uuid_medication', as: 'uuid_Medication' })

        this._CaseRecordPage = sequelize.define('CaseRecordPage', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecordPages__id'
            },
            uuid_caseRecordPage: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            priceTotal: {
                type: DataTypes.INTEGER
            },
            dataPage: {
                type: DataTypes.TEXT
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uuid_caseRecord: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_caseRecord_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecord']
            }]
        })
        this._CaseRecord.hasMany(this._CaseRecordPage, { foreignKey: 'uuid_caseRecord' })
        this._CaseRecordPage.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })

        this._CaseRecordPageEH = sequelize.define('CaseRecordPageEH', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__CaseRecordPagesEH__id'
            },
            uuid_caseRecordPageEH: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            dataPage: {
                type: DataTypes.TEXT
            },
            uuid_caseRecordPage: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_caseRecordPage_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecordPage']
            }]
        })
        this._CaseRecordPage.hasMany(this._CaseRecordPageEH, { foreignKey: 'uuid_caseRecordPage' })
        this._CaseRecordPageEH.belongsTo(this._CaseRecordPage, { foreignKey: 'uuid_caseRecordPage', targetKey: 'uuid_caseRecordPage', as: 'uuid_CaseRecordPage' })

        this._OrderAllMedication = sequelize.define('OrderAllMedication', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__OrderAllMedications__id'
            },
            uuid_orderAllMedication: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image_video: {
                type: DataTypes.TEXT
            },
            note1: {
                type: DataTypes.TEXT
            },
            note2: {
                type: DataTypes.TEXT
            },
            history: {
                type: DataTypes.STRING,
                allowNull: false
            }, 
            report: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            caseRecordPage: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            uuid_caseRecord: {
                type: Sequelize.UUID,
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
            }, {
                name: 'uuid_caseRecord_indexes',
                using: 'BTREE',
                fields: ['uuid_caseRecord']
            }]
        })
        this._User.hasMany(this._OrderAllMedication, { foreignKey: 'uuid_user' })
        this._CaseRecord.hasMany(this._OrderAllMedication, { foreignKey: 'uuid_caseRecord' })
        this._OrderAllMedication.belongsTo(this._User, { foreignKey: 'uuid_user', targetKey: 'uuid', as: 'uuid_User' })
        this._OrderAllMedication.belongsTo(this._CaseRecord, { foreignKey: 'uuid_caseRecord', targetKey: 'uuid_caseRecord', as: 'uuid_CaseRecord' })

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
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            uuid_orderAllMedication: {
                type: Sequelize.UUID,
                allowNull: false
            },
            uuid_medication: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_orderAllMedication_indexes',
                using: 'BTREE',
                fields: ['uuid_orderAllMedication']
            }, {
                name: 'uuid_medication_indexes',
                using: 'BTREE',
                fields: ['uuid_medication']
            }]
        })
        // this._OrderAllMedication.hasMany(this._OrderMedication, { foreignKey: 'uuid_orderAllMedication' })
        // this._Medication.hasMany(this._OrderMedication, { foreignKey: 'uuid_medication' })
        this._OrderMedication.belongsTo(this._OrderAllMedication, { foreignKey: 'uuid_orderAllMedication', targetKey: 'uuid_orderAllMedication', as: 'uuid_OrderAllMedication' })
        this._OrderMedication.belongsTo(this._Medication, { foreignKey: 'uuid_medication', targetKey: 'uuid_medication', as: 'uuid_Medication' })

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
            uuid_orderAllMedication: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_orderAllMedication_indexes',
                using: 'BTREE',
                fields: ['uuid_orderAllMedication']
            }]
        })
        this._OrderAllMedication.hasOne(this._PaymentMedication, { foreignKey: 'uuid_orderAllMedication' })
        this._PaymentMedication.belongsTo(this._OrderAllMedication, { foreignKey: 'uuid_orderAllMedication', targetKey: 'uuid_orderAllMedication', as: 'uuid_OrderAllMedication' })

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
            uuid_orderAllMedication: {
                type: Sequelize.UUID,
                allowNull: false
            }
        }, {
            indexes: [{
                name: 'uuid_orderAllMedication_indexes',
                using: 'BTREE',
                fields: ['uuid_orderAllMedication']
            }]
        })
        this._OrderAllMedication.hasOne(this._Transport, { foreignKey: 'uuid_orderAllMedication' })
        this._Transport.belongsTo(this._OrderAllMedication, { foreignKey: 'uuid_orderAllMedication', targetKey: 'uuid_orderAllMedication', as: 'uuid_OrderAllMedication' })

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

    getCaseRecord() {
        return this._CaseRecord;
    }

    getCaseRecordDescription() {
        return this._CaseRecordDescription;
    }

    getCaseRecordImage() {
        return this._CaseRecordImage;
    }

    getCaseRecordVideo() {
        return this._CaseRecordVideo;
    }

    getCaseRecordPrescription() {
        return this._CaseRecordPrescription;
    }

    getCaseRecordMedication() {
        return this._CaseRecordMedication;
    }

    getCaseRecordPage() {
        return this._CaseRecordPage;
    }

    getCaseRecordPageEH() {
        return this._CaseRecordPageEH;
    }

    getOrderAllMedication() {
        return this._OrderAllMedication;
    }

    getOrderMedication() {
        return this._OrderMedication;
    }

    getPaymentMedication() {
        return this._PaymentMedication;
    }

    getTransport() {
        return this._Transport;
    }
}

const defineModel = new DefineModel();

module.exports = { defineModel }