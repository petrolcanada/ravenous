const express = require('express');
const app = express();
const port = 3000;
const kafkaProducer = require('./kafkaProducer');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');


const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const io = require('socket.io')(server);


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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
const consumerGroup = new kafka.ConsumerGroup(options,topicName);
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



