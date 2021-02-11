const { Subject, Publisher } = require('@tiotix/common');

class MovieCreatedPublisher extends Publisher {
    subject = Subject.MovieCreated;
}

module.exports = {
    MovieCreatedPublisher
};