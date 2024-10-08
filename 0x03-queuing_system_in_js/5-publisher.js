import { createClient } from 'redis';

// Create a Redis client
const publisher = createClient();

// On connect, log a message
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

// On error, log a message
publisher.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to publish a message after a certain time delay
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
}

// Call the function to publish messages with a delay
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
