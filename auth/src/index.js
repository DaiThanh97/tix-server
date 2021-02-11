require('dotenv').config();
const app = require('./app');
const db = require('./configs/database');

const start = async () => {
    try {
        await db.authenticate();
        console.log("Connected to DB");

        app.listen(5000, () => {
            console.log("Auth service is listening on port 5000!");
        });
    } catch (err) {
        console.log("Failed to connect to DB ", err);
    }
}

start();