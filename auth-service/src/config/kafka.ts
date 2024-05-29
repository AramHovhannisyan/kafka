import { Kafka, KafkaConfig, Partitioners } from 'kafkajs';

const kafkaConfig: KafkaConfig = { 
  clientId: 'user-activity-tracker',
  brokers: ['broker:9092']
};

const kafka = new Kafka(kafkaConfig);

const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

const sendRecord = async (message: string) => {
  try {
    await producer.send({
      topic: 'user-activity',
      messages: [
        { value: JSON.stringify(message) }
      ],
    });
    console.log('Message sent:', message);
  } catch (err) {
    console.error('Failed to send message:', err);
  }
};

connectProducer();

export default sendRecord;

// const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: 'test-group' });

// const run = async () => {
//   // Producing
//   await producer.connect();
//   await producer.send({
//     topic: 'test-topic',
//     messages: [
//       { value: 'Hello KafkaJS user!' },
//     ],
//   });

//   // Consuming
//   await consumer.connect();
//   await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.info({
//         partition,
//         offset: message.offset,
//         value: message.value?.toString(),
//       });
//     },
//   });
// };

// run().catch(console.error);