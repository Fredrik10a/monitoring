const amqp = require('amqplib');

async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();

    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

async function setupQueues(channel) {
  const queueName = 'message_queue';
  await channel.assertQueue(queueName, { durable: false });

  const queueNameLogstash = 'logstash_queue';
  await channel.assertQueue(queueNameLogstash, { durable: false });

  console.log(`[*] Waiting for messages from the "${queueName}" queue.`);

  return { queueName, queueNameLogstash };
}

function consumeMessages(channel, queueName, queueNameLogstash) {
  channel.consume(queueName, (message) => {
    if (message === null) {
      return;
    }

    const messageContent = message.content.toString();
    let event = JSON.parse(messageContent);
    event.data.custom = "ACKED";

    processReceivedEvent(event, channel, queueNameLogstash);

    channel.ack(message);
  });
}

function processReceivedEvent(event, channel, queueNameLogstash) {
  console.log(`[Received] Event: ${JSON.stringify(event)}`);

  event.data.ack = true;

  publishModifiedEvent(event, channel, queueNameLogstash);
}

function publishModifiedEvent(event, channel, queueNameLogstash) {
  const modifiedMessage = JSON.stringify(event);
  channel.sendToQueue(queueNameLogstash, Buffer.from(modifiedMessage));
  console.log(`[x] Published modified event to "${queueNameLogstash}": ${modifiedMessage}`);
}

async function startConsuming() {
  try {
    const { connection, channel } = await connectToRabbitMQ();
    const { queueName, queueNameLogstash } = await setupQueues(channel);

    consumeMessages(channel, queueName, queueNameLogstash);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Start consuming
startConsuming();
