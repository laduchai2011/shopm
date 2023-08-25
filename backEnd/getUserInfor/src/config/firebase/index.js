const admin = require("firebase-admin");

const serviceAccount = require("./shopm-70ee1-firebase-adminsdk-iehsk-139e398547.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const adminFirebase = () => {
    return admin;
}

module.exports = { adminFirebase };