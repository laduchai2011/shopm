const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shopm', 'sa', '201195laducHai' , {
    host: '127.0.0.1',
    port: 1434,
    dialect: 'mssql', 
    dialectOptions: {
        options: {
            encrypt: false,
            enableArithAbort: true,
            cryptoCredentialsDetails: {
              minVersion: "TLSv1",
            },
        }
    }
});

module.exports = { sequelize }