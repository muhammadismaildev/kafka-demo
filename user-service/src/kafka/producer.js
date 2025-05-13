import { Kafka } from 'kafkajs';
import EVENTS from '../../../constants/events.js'

const kafka = new Kafka({ clientId: 'user-service', brokers: ['kafka:9092'] });
const producer = kafka.producer();

export const connectProducer = async () => await producer.connect();

export const emitUserCreated = async (user) => {
    await producer.send({
        topic: EVENTS.USER_CREATED,
        messages: [{ value: JSON.stringify(user) }],
    });
};

