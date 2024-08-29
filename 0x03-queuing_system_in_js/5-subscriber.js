import { createClient } from 'redis';

// Create a Redis client
const subscriber = createClient();

// On connect, log a message
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// On error, log a message
subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel "holberton school channel"
subscriber.subscribe('holberton school channel');

// Handle incoming messages
subscriber.on('message', (channel, message) => {
  console.log(message);
  
  // If the message is "KILL_SERVER", unsubscribe and quit
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
