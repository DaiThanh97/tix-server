const nats = require('node-nats-streaming');

const adminService = require('./services/admin.service');

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

    async handleAllEventNotPublished() {
        const result = await adminService.spAdminGetEvent();
        if (result[0]) {
            const listEvent = Object.values(result[0]);
            for (let child of listEvent) {
                this.client.publish(child.Subject, child.Data, (err) => {
                    if (err) {
                        return;
                    }
                    adminService.spAdminUpdateEvent(child.ID);
                });
            }
        }
    }

    connect(clusterId, clientId, url) {
        this.client = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log("Connected to NATS");
                this.handleAllEventNotPublished();
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