import { createClient, print } from 'redis'; // Import the createClient and print methods from the redis library

// Create a Redis client
const client = createClient();

// Handle successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle error on connection
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to create a hash with multiple key-value pairs
function createHolbertonSchoolsHash() {
  client.hset('HolbertonSchools', 'Portland', 50, print);
  client.hset('HolbertonSchools', 'Seattle', 80, print);
  client.hset('HolbertonSchools', 'New York', 20, print);
  client.hset('HolbertonSchools', 'Bogota', 20, print);
  client.hset('HolbertonSchools', 'Cali', 40, print);
  client.hset('HolbertonSchools', 'Paris', 2, print);
}

// Function to display all fields and values of the hash
function displayHolbertonSchoolsHash() {
  client.hgetall('HolbertonSchools', (err, result) => {
    if (err) {
      console.error(`Error retrieving hash: ${err.message}`);
    } else {
      console.log(result);
    }
  });
}

// Call functions in the specified order
createHolbertonSchoolsHash(); // Create and store the hash in Redis
displayHolbertonSchoolsHash(); // Retrieve and display the hash from Redis
