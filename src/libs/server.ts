import express from "express"
import dotenv from 'dotenv'
import bodyParser from "body-parser";

dotenv.config()

const app = express();
const port = process.env.SERVER_PORT;

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app