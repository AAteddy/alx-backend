import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Job data object
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a test message.',
};

// Create a job in the queue named 'push_notification_code'
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.log('Error creating job:', err);
    }
  });

// Event listener for when the job is completed
job.on('complete', () => {
  console.log('Notification job completed');
});

// Event listener for when the job fails
job.on('failed', () => {
  console.log('Notification job failed');
});
