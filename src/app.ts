import app from "./libs/server.js";
import { Request, Response } from "express"
import awsSqsRouter from "./apps/aws-sqs/entry-points/api.js"
import awsSnsRouter from "./apps/aws-sns/entry-points/api.js"
import { apiDocMiddleWare, apiDocUi } from "./libs/api-docs.js";
import { errorHandler } from "./libs/error-handler.middleware.js";

app.use(awsSqsRouter);
app.use(awsSnsRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    msg: 'Hello!', 
    body: req.body, 
    params: req.params, 
    query: req.query 
  });
});

app.use("/api-docs", apiDocMiddleWare, apiDocUi);
app.use(errorHandler);