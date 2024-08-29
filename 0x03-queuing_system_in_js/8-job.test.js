import kue from 'kue';
import chai from 'chai';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';

const { expect } = chai;

describe('createPushNotificationsJobs', function() {
  let queue;

  beforeEach(function() {
    // Create a Kue queue instance in test mode
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  afterEach(function() {
    // Clear the queue and exit test mode
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', function() {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('should create jobs in the queue and handle events correctly', function(done) {
    const list = [
      { phoneNumber: '4153518780', message: 'Test message 1' },
      { phoneNumber: '4153518781', message: 'Test message 2' }
    ];

    // Create jobs
    createPushNotificationsJobs(list, queue);

    // Validate the jobs in the queue
    setImmediate(() => {
      const jobs = queue.testMode.jobs;
      expect(jobs.length).to.equal(2);

      // Check that the jobs are created with the correct data
      jobs.forEach((job, index) => {
        expect(job.data.phoneNumber).to.equal(list[index].phoneNumber);
        expect(job.data.message).to.equal(list[index].message);
      });

      done();
    });
  });
});
