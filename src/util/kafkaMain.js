// import kafkaConsumer from './kafkaConsumer';
// import kafkaProducer from './kafkaProducer';
// export { kafkaConsumer, kafkaProducer };

const kafkaConsumer = require('./kafkaConsumer');
const kafkaProducer = require('./kafkaProducer');

module.exports = {
    kafkaConsumer: kafkaConsumer,
    kafkaProducer: kafkaProducer,
};


