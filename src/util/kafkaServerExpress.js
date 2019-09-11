const express = require('express');
const app = express();
const port = 3000;
const kafkaProducer = require('./kafkaProducer');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');
const cors = require('cors');
const { KafkaStreams } = require("kafka-streams");
const kafkaStreamConfig = require("./kafkaStreamsConfig");

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const io = require('socket.io')(server);
io.origins('*:*');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/kafka/producer', (req, res) => {
    const message = req.param('message');
    kafkaProducer(message);
    res.send(`${message} has been  written in  Kafka!`);
});


const options = {
    kafkaHost: 'localhost:9092',
    groupId: 'kafka_express',
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    sessionTimeout: 15000,
    fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
    protocol: ['roundrobin'],
    fromOffset: 'latest',
    outOfRangeOffset: 'earliest'
};
const topicName = 'searchParams'
const consumerGroup = new kafka.ConsumerGroup(options, topicName);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    consumerGroup.on('message', message => {
        socket.emit('messageFromKafka', message.value);
        setTimeout(() => {
            consumerGroup.commit((err, data) => {
                console.log(`${message.value} *******  committed successfully!`);
            });
        }, 0);
    });
    consumerGroup.on('error', function (err) {
        console.log('error', err);
    });
});


// const kafkaStreams = new KafkaStreams(kafkaStreamConfig);
// const kafkaTopicFrom = "searchParams";
// const kafkaTopicTo = "searchParamsAggr"
// const toKv = message => {
//     // const msg = message.toString().split(",");
//     // return {
//     //     key: msg[0],
//     //     value: msg[1]
//     // };
//     return message;
// };
// const table = kafkaStreams.getKTable(kafkaTopicFrom, toKv);
// table.consumeUntilCount(10, () => {
//     console.log("topic has been consumed until count of 10 messages.");
// });
// // table.countByKey("key", "count")
// //     .map(kv => kv.key + " " + kv.count)
// //     .tap(kv => console.log(kv.toString()))
// //     .to(kafkaTopicTo)

// table.forEach(message => JSON.stringify(message))   
//     .skipRepeats()
//     .to(kafkaTopicTo)

// table.start().then(() => {
//     console.log("table stream started, as kafka consumer is ready.");
// }, error => {
//     console.log("table streamed failed to start: " + error);
// });

const kafkaTopicFrom = "searchParams";
const kafkaTopicTo = "searchParamsAggr"
const kafkaStreams = new KafkaStreams(kafkaStreamConfig);
const stream = kafkaStreams.getKStream(kafkaTopicFrom);

stream.forEach(message => console.log(message));
stream.to(kafkaTopicTo);
stream.start().then(()=>{
    console.log("stream started, as kafka consumer is ready.");
}, err => {
    console.log("streamed failed to start: " + err);
})

// const windowPeriod = 10 * 1000; // 10 seconds
// const from = Date.now();
// const to = Date.now() + windowPeriod;

// const {stream, abort} = consumeStream.window(from, to);
// const keyValueMapperEtl = message => {
//     return {
//         key: message.value,
//         value: undefined // not required
//     };
// }

// stream
//     .map(keyValueMapperEtl)
//     .countByKey("key", "count")
//     .map(kv => kv.key + " " + kv.count)
//     .tap(kv => console.log(kv))
//     .to(kafkaTopicTo);

// consumeStream.start().then(()=>{
//     console.log('stream is started');
// }, err =>{
//     console.log(err);
// });

