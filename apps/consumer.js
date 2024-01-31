const amqp = require('amqplib');

async function consumeRandomEvents() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();

    const queueName = 'message_queue';
    await channel.assertQueue(queueName, { durable: false });

    console.log(`[*] Waiting for messages from the "${queueName}" queue.`);

    // Consume messages from the queue
    channel.consume(queueName, (message) => {
      if (message === null) {
        return;
      }

      // Parse the message content
      const messageContent = message.content.toString();
      const event = JSON.parse(messageContent);

      // Process the received event
      processRandomEvent(event);

      // Acknowledge the message
      channel.ack(message);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function processRandomEvent(event) {
  console.log(`[Received] Event: ${JSON.stringify(event)}`);
}

// Start
consumeRandomEvents();
