import AWS from "aws-sdk";
import { PublishInput, Types } from "aws-sdk/clients/sns";
import { randomNo } from "./random.js";

export default class AwsSnsService {
  private topicArn: string;
  private sns: AWS.SNS;

  constructor(conf: Types.ClientConfiguration, topicArn: string) {
    this.topicArn = topicArn

    this.sns = new AWS.SNS({
      accessKeyId: conf.accessKeyId,
      secretAccessKey: conf.secretAccessKey,
      region: 'ap-southeast-1',
      ...conf
    });
  }

  async publishToSNSTopic(conf?: { message: string }) {
    const params: PublishInput = {
      Message: conf?.message || "",
      TopicArn: this.topicArn,
      MessageGroupId: randomNo(), // Messages in queue are ordered by group
      MessageDeduplicationId: randomNo(), // Queue remove duplicated message by this field
    };
  
    try {
      const result = await this.sns.publish(params).promise();
      console.log('Message sent successfully', result);
      return result;
    } catch (err) {
      console.error('Error sending message', err);
      throw err
    }
  }
}