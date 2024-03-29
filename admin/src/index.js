const app = require('./app');
const db = require('./configs/database');
const natsWrapper = require('./nats-wrapper');

const start = async () => {
    try {
        // Init Nats client
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        const client = natsWrapper.getClient();
        client.on('close', () => {
            console.log("NATS connection closed!");
            process.exit();
        });
        process.on('SIGINT', () => client.close());
        process.on('SIGTERM', () => client.close());

        // Connect DB
        await db.authenticate();
        console.log("Connected to DB");

        app.listen(5000, () => {
            console.log("Admin service is listening on port 5000!");
        });
    } catch (err) {
        console.log("Failed to connect to DB ", err);
    }
}

start();