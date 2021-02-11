const nats = require('node-nats-streaming');

class NatsWrapper {
    constructor() {
        this.client = null;
    }

    getClient() {
        if (!this.client) {
            throw new Error('Nats client is not initialized');
        }
        return this.client;
    }

    connect(clusterId, clientId, url) {
        this.client = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log("Connected to NATS");
                resolve();
            });

            this.client.on('error', (err) => {
                reject(err);
            });
        });
    }
}

const natsWrapper = new NatsWrapper();
module.exports = natsWrapper;