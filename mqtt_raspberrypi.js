const mqtt = require('mqtt')

var urlraspberrypi_mdns = 'mqtt://raspberrypi.local:1883';

var urlraspberrypitunnel = 'ws://raspberrypi-mqtt.joaosilvagomes.com/ws';

const connectUrl = `ws://raspberrypi.local:15675/ws`

const client = mqtt.connect(urlraspberrypitunnel,
    {
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
        protocol: 'ws'
    })



client.on('connect', function () {
    client.subscribe('topic test', function (err) {
        if (!err) {
            let timestamp = new Date().toISOString();
            let message = `Message Timestamp:  ${timestamp}`
            client.publish('topic test', message)
        }
        else {
            console.log(err);
        }

    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString())
    console.log(message.toString())
    client.end()
})