import kue from 'kue';

// Create an array containing the blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Define the sendNotification function
function sendNotification(phoneNumber, message, job, done) {
  // Start tracking the job progress
  job.progress(0, 100);

  // Check if the phone number is in the blacklist
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job if the phone number is blacklisted
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // If not blacklisted, continue processing the job
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  
  // Simulate job completion after processing
  done();
}

// Create a Kue queue
const queue = kue.createQueue();

// Set up the queue to process jobs from the push_notification_code_2 queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
