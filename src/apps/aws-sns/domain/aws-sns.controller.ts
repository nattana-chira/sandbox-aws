import { Request, Response } from "express"
import AwsSnsService from "../../../libs/aws-sns.js";

class AwsSnsController {
  private constructor() {}

  static async publishToSNSTopic(req: Request, res: Response) {
    const result = await snsService().publishToSNSTopic(req.body)
    res.json({ status: "Ok", data: result });
  }
}

const snsService = () => {
  const topicArn = 'arn:aws:sns:ap-southeast-1:931623697513:MyFifoTopic.fifo'
    
  return new AwsSnsService({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1'
  }, topicArn)
}

export default AwsSnsController