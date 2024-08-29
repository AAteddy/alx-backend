import { createClient, print } from 'redis';
import { promisify } from 'util';

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

// Promisify the client.get method
const getAsync = promisify(client.get).bind(client);

// Function to get the value of a key from Redis using async/await
async function displaySchoolValue(schoolName) {
  try {
    const result = await getAsync(schoolName); // Await the result of the promisified get function
    console.log(result);
  } catch (err) {
    console.error(`Error retrieving value for ${schoolName}: ${err.message}`);
  }
}

// Function to set a new key-value pair in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print); // redis.print logs a confirmation message to the console
}

// Call functions as specified
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
