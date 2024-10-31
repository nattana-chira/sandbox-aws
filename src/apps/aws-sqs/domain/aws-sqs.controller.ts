import AwsSqsService from "../../../libs/aws-sqs.js";
import { Request, Response } from "express"

class AwsSqsController {
  private constructor() {}

  static async sendMessage(req: Request, res: Response) {
    AwsSqsController.sqsSevice().sendMessage(req.body, (err, data) => {
      res.json({ status: "Ok", err, data });
    })
  }

  static async receiveMessage(req: Request, res: Response) {
    AwsSqsController.sqsSevice().receiveMessage(req.body, (err, data) => {
      res.json({ status: "Ok", err, data });
    })
  }

  static async deleteMessage(req: Request, res: Response) {
    AwsSqsController.sqsSevice().deleteMessage(req.body.ReceiptHandle, (err) => {
      res.json({ status: "Ok", err });
    })
  }

  static sqsSevice() {
    const queueUrl = 'https://sqs.ap-southeast-1.amazonaws.com/931623697513/MyQueue2.fifo'
    
    return new AwsSqsService({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }, queueUrl)
  }
}

export default AwsSqsController