const mqtt = require('mqtt')

var urlraspberrypi = 'mqtt://raspberrypi.local:1883';

const client = mqtt.connect(urlraspberrypi)



client.on('connect', function () {
    client.subscribe('topic 1', function (err) {
        if (!err) {
            let timestamp = new Date().toISOString();
            let message = `Message Timestamp:  ${timestamp}`
            client.publish('topic 1', message)
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString())
    console.log(message.toString())
    client.end()
})