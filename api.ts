import express from "express";
import helmet from "helmet";
import * as dotenv from "dotenv";

import { TestKeys, getTestNames, getTest, getQuestions } from "./src/processor"
import { QueryParams } from "./src/test";

const app = express();

// Dotenv (used to read configuration from the .env file)

dotenv.config();
const port = process.env.PORT;

////////////////////////////////////////



// ExpressJS middleware

app.use(helmet())

app.use((req, _res, next) => { // Logging requests
        console.log("[" + Date().toLocaleString() + "]:" + " Requested " + req.originalUrl + " by " + req.ip);
        next()
})

app.use((_req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	next()
})

////////////////////////////////////////



// Routers

app.get('/', (_req, res) => {
        res.send("<h1>Welcome to the eMaturaTK API. Feel free to use the data however you want.</h1>\n" + 
                "<h2>API endpoints:</h2>\n" + 
                "<ul>" +
                        "<li>/tests - List of available tests</li>" +
                        "<li>/test/:name - Test with all questions and matadata</li>" +
                        "<li>/test/:name:/questions - All questions of the particular test</li>" +
                "</ul>")
});

app.get('/tests', (_req, res) => {
        res.json(getTestNames())
});

app.get('/test/:testName', (req, res) => {

        if (!getTestNames().includes(req.params.testName)) {
                res.status(404).send("Could not find specified test")
        }

        const params = <QueryParams>req.query;
        const foundTest = getTest(req.params.testName as TestKeys, params.questnum, params.shuffled);

        res.json(foundTest);

});

app.get('/test/:testName/questions', (req, res) => {

        if (!getTestNames().includes(req.params.testName)) {
                res.status(404).send({error: "Could not find specified test"})
        }

        const params = <QueryParams>req.query;
        const foundQuestions = getQuestions(req.params.testName as TestKeys, params.questnum, params.shuffled);

        res.json(foundQuestions);

});

////////////////////////////////////////



// ExpressJS server

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}/`)
});

////////////////////////////////////////
