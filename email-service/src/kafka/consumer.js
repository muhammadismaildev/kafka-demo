import { Kafka } from 'kafkajs';
import EVENTS from '../../../constants/events.js';

const kafka = new Kafka({ clientId: 'email-service', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'email-group' });

export const connectConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topics: [EVENTS.USER_CREATED, EVENTS.ORDER_CREATED] });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            const event = JSON.parse(message.value);
            if (topic === EVENTS.USER_CREATED) {
                console.log(`Sending Welcome Email to ${event.email}`);
            } else if (topic === EVENTS.ORDER_CREATED) {
                console.log(`Sending Order Confirmation to User ${event.userId}`);
            }
        },
    });
};

