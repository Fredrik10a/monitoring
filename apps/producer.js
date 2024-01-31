const amqp = require('amqplib');

async function produceRandomEvents(iterations) {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();

    const queueName = 'message_queue';
    await channel.assertQueue(queueName, { durable: false });

    for (let i = 0; i < iterations; i++) {

      const event = generateRandomEvent();

      const message = JSON.stringify(event);

      // Publish the message to the queue
      channel.sendToQueue(queueName, Buffer.from(message));

      console.log(`[x] Sent event (${i + 1}/${iterations}): ${message}`);
    }

    // Close the connection and exit the application
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);

  } catch (error) {
    console.error('Error:', error);
  }
}

function generateRandomEvent() {
  // Example: Generating a random event with a random key-value pair
  const eventTypes = ['EVENT_TYPE_1', 'EVENT_TYPE_2', 'EVENT_TYPE_3'];
  const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  return {
    event: randomEventType,
    data: {
      key: generateRandomString(),
      value: Math.random() * 100,
    },
  };
}

function generateRandomString(length = 8) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
}

const numberOfIterations = 5;

// Start
produceRandomEvents(numberOfIterations);
