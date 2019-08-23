const express  = require('express');
const app = express();
const port = 3000;
const kafkaProducer = require('./kafkaProducer');
const kafkaConsumer = require('./kafkaConsumer');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/kafka/producer',(req,res) => {
    const message = req.param('message');
    kafkaProducer(message);
    res.send(`${message} has been  written in  Kafka!`);
});

app.get('/kafka/consumer',kafkaConsumer);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})