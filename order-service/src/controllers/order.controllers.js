import { emitOrderCreated } from '../kafka/producer.js';

export const createOrder = async (req, res) => {
    const { userId, productName, qty, location } = req.body;
    const newUser = { id: Date.now(), userId, productName, qty, location };

    await emitOrderCreated(newUser);
    res.status(201).json(newUser);
};