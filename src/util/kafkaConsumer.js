
const kafkaConsumer = () => {
    const kafka = require('kafka-node');
    try {
        const Consumer = kafka.Consumer;
        const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
        const topicPartition = [
            { topic: "searchParams", partition: 0 },
            { topic: "searchParams", partition: 1 },
            { topic: "searchParams", partition: 2 },
            { topic: "searchParams", partition: 3 }
        ];
        const kafkaConfig = {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false,
            groupId: 'kafkaConsumer_JS',
        };
        const consumer = new Consumer(
            client,
            topicPartition,
            kafkaConfig
        );
        consumer.on('message', message => {
            console.log('Second event triggered');
        });
        consumer.on('message', message => {
            console.log(
                'kafka-> ',
                message.value
            );
            // setTimeout(() => {
            //     consumer.commit((err, data) => {
            //         // Here the commit will work as expected
            //         console.log(`${message.value} *******  committed successfully!`);
            //     });
            // }, 0);
        });

        consumer.on('error', function (err) {
            console.log('error', err);
        });

    }
    catch (e) {
        console.log(e);
    }
};



const kafkaConsumerGroup = () => {
    const kafka = require('kafka-node');
    const options = {
        kafkaHost: 'localhost:9092',
        groupId: 'kafkaConsumer_JS',
        autoCommit: true,
        autoCommitIntervalMs: 5000,
        sessionTimeout: 15000,
        fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
        protocol: ['roundrobin'],
        fromOffset: 'latest',
        outOfRangeOffset: 'earliest'
    };
    const topicName = 'searchParams'
    const consumerGroup = new kafka.ConsumerGroup(options,topicName);
    consumerGroup.on('message', message => {
        console.log('Message:   ' + message.value);
    });
    consumerGroup.on('error', err  => {
        console.log(err);
    });
};

kafkaConsumerGroup();
// kafkaConsumer();
