import { emitUserCreated } from '../kafka/producer.js';

export const createUser = async (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: Date.now(), name, email, orderCount: 0 };

    await emitUserCreated(newUser);
    res.status(201).json(newUser);
};