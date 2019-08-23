
const kafkaConsumer = (req, res) => {
    const kafka = require('kafka-node');
    try {
        const Consumer = kafka.Consumer;
        const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
        let consumer = new Consumer(
            client,
            [{ topic: "searchParams", partition: 0 }],
            {
                autoCommit: false,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: 'utf8',
                fromOffset: false
            }
        );

        consumer.on('message', message => {
            console.log('Second event triggered');
        });
        consumer.on('message', message => {
            console.log(
                'kafka-> ',
                message.value
            );
            // return message.value;
            setTimeout(() => {
                consumer.commit((err, data) => {
                    // Here the commit will work as expected
                    console.log(`${message.value} *******  committed successfully!`);
                    // return message.value;
                    res.send(message.value);
                });
            }, 0);
        });

        consumer.on('error', function (err) {
            console.log('error', err);
        });

    }
    catch (e) {
        console.log(e);
    }
};

module.exports = kafkaConsumer;
