import express from "express";
import userRoutes from "./routes/order.routes.js";
import {connectProducer} from "./kafka/producer.js";

const app = express();

const port = 5002;

app.use(express.json());

app.use("/order", userRoutes);

app.listen(port, async () => {
    await connectProducer()
    console.log(`Server started on port ${port}`)
});