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

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
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
        socket.emit('messageFromKafka', message.value);
        setTimeout(() => {
            consumer.commit((err, data) => {
                console.log(`${message.value} *******  committed successfully!`);
            });
        }, 0);
    });

    consumer.on('error', function (err) {
        console.log('error', err);
    });
});



