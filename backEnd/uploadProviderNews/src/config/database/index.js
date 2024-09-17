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

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = { sequelize }