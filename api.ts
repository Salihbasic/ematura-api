import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.get('/', (_req, res) => {
        res.send("Hello, world!")
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}/`)
});