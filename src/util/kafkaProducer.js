const kafkaProducer = (dataToSend) => {
    const kafka = require('kafka-node'),
        Producer = kafka.Producer,
        client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }),
        producer = new Producer(client),
        payloads = [
            { topic: 'searchParams', messages: dataToSend },
        ];

    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });
    producer.on('error', function (err) { console.log(err) })
};

module.exports = kafkaProducer;