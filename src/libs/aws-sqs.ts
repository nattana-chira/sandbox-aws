import AWS, { AWSError } from "aws-sdk";
import { randomNo } from "./random.js";
import { DeleteMessageBatchRequest, ReceiveMessageRequest, SendMessageRequest, Message, ReceiveMessageResult, DeleteMessageBatchResult, MessageList, SendMessageResult, Types } from "aws-sdk/clients/sqs.js";

export default class AwsSqsService {
  private queueUrl: string;
  private sqs: AWS.SQS;

  constructor(conf: Types.ClientConfiguration, queueUrl: string) {
    this.queueUrl = queueUrl
    this.sqs = new AWS.SQS({
      accessKeyId: conf.accessKeyId,
      secretAccessKey: conf.secretAccessKey,
      region: 'ap-southeast-1',
      apiVersion: '2012-11-05',
      ...conf
    });
  }

  sendMessage(conf?: { message: string }, callback?: (err: AWSError, data: SendMessageResult) => void) {
    const params: SendMessageRequest = {
      MessageGroupId: randomNo(), // Messages in queue are ordered by group
      MessageDeduplicationId: randomNo(), // Queue remove duplicated message by this field
      MessageBody: conf?.message || "",
      QueueUrl: this.queueUrl,
      DelaySeconds: 0 // Delay time before message show up in queue
    };
  
    return this.sqs.sendMessage(params, (err: AWSError, data: SendMessageResult) => {
      if (err) 
        console.log('Error', err);
      else if (data)
        console.log('Successfully added message', data.MessageId);
      
      if (callback) callback(err, data)
    });
  }

  receiveMessage(conf?: { autoDelete: boolean }, callback?: (err: AWSError, data: ReceiveMessageResult) => void) {
    const params: ReceiveMessageRequest = {
      AttributeNames: ["SentTimestamp"],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ["All"],
      QueueUrl: this.queueUrl,
      VisibilityTimeout: 20, // Time before message back to queue
      WaitTimeSeconds: 0 // Polling time
    };
  
    this.sqs.receiveMessage(params, (err: AWSError, data: ReceiveMessageResult) => {
      if (err) {
        console.log("Receive Error", err);
      } 
      else if (data.Messages) {
        console.log('Receive data', data)
        if (callback) callback(err, data)
        if (conf?.autoDelete) this.deleteMessageBatch(data.Messages)
      }
    })
  }

  deleteMessageBatch(messages: MessageList) {
    const entries = messages.map((msg: Message) => ({ 
      Id: msg.MessageId || '',
      ReceiptHandle: msg.ReceiptHandle || ''
    }))
  
    const params: DeleteMessageBatchRequest = {
      Entries: entries,
      QueueUrl: this.queueUrl
    }
  
    this.sqs.deleteMessageBatch(params, (err: AWSError, data: DeleteMessageBatchResult) => {
      if (err) 
        console.log("deleteMessageBatch Error", err);
      else if (data) 
        console.log('deleteMessageBatch data', data)
    })
  }

  deleteMessage(deleteIndex: string, callback?: (err: AWSError) => void) {
    var deleteParams = {
      ReceiptHandle: deleteIndex,
      QueueUrl: this.queueUrl,
    }
  
    this.sqs.deleteMessage(deleteParams, (err: AWSError) => {
      if (err) 
        console.log("Delete Error", err);
      else 
        console.log("Message Deleted", {});

      if (callback) callback(err)
    });
  }
}