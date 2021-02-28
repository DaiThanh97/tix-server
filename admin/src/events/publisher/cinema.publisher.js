const { Subject, Publisher } = require('@tiotix/common');

class MovieCreatedPublisher extends Publisher {
    subject = Subject.MovieCreated;
}

class MovieUpdatedPublisher extends Publisher {
    subject = Subject.MovieUpdated;
}

class MovieDeletedPublisher extends Publisher {
    subject = Subject.MovieDeleted;
}

module.exports = {
    MovieCreatedPublisher,
    MovieUpdatedPublisher,
    MovieDeletedPublisher
};