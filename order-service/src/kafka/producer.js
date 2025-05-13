import { Kafka } from 'kafkajs';
import EVENTS from '../../../constants/events.js'

const PARTITIONS_MAP = {
    'Karachi': 0,
    'Lahore': 1,
    'Islamabad': 2
}

const kafka = new Kafka({ clientId: 'order-service', brokers: ['kafka:9092'] });

const MyPartitioner = () => {
    return ({ topic, partitionMetadata, message }) => {
        return PARTITIONS_MAP[message.key] ?? 3
    }
}

const admin = kafka.admin()
const producer = kafka.producer({ createPartitioner: MyPartitioner });

export const connectProducer = async () => {
    try {
        await admin.connect();
        const topicPartitions = [
            {
                topic: EVENTS.ORDER_CREATED,
                count: 4,
            },
        ];

        await admin.createPartitions({
            validateOnly: false, // Set to true to validate without actually creating
            topicPartitions: topicPartitions,
        });
    } catch (error) {
        console.error('Error creating partitions:', error);
    } finally {
        await admin.disconnect();
        await producer.connect();
    }
}

export const emitOrderCreated = async (order) => {
    await producer.send({
        topic: EVENTS.ORDER_CREATED,
        messages: [{
            key: order.location,
            value: JSON.stringify(order)
        }],
    });
};
