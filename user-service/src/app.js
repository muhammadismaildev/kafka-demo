import express from "express";
import userRoutes from "./routes/user.routes.js";
import {connectProducer} from "./kafka/producer.js";

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(port, async () => {
    await connectProducer()
    console.log(`Server started on port ${port}`)
});