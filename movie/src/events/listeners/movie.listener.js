const { Subject, Listener } = require('@tiotix/common');

class MovieCreatedListener extends Listener {
    subject = Subject.MovieCreated;
    queueGroupName = process.env.QUEUE_GROUP_NAME;
    onMessage = (data, msg) => {
        console.log("Data received: ", data);
        msg.ack();
    }
}

module.exports = {
    MovieCreatedListener
}

