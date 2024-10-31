import express from "express";
import asyncHandler from "express-async-handler";
import AwsSqsController from "../domain/aws-sqs.controller.js";

const router = express.Router();

/**
 * @swagger
 * /aws-sqs/send:
 *   post:
 *     summary: Send a message
 *     requestBody:
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - message
 *           properties:
 *             message:
 *               type: string
 *               example: "Hello world"
 *     responses:
 *       200:
 *         description: A message
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                 status: "Ok",
 *                 data: {
 *                   MD5OfMessageBody: "f5561dab0b4d92e5073923f638999685",
 *                   MessageId: "4698085a-6aa1-4900-abb9-4a47ce66688c",
 *                   SequenceNumber: "18889539463182063616"
 *                 }
 *               }
 */
router.post("/aws-sqs/send", asyncHandler(AwsSqsController.sendMessage));

/**
 * @swagger
 * /aws-sqs/receive:
 *   post:
 *    summary: Receive messages
 *    description: | 
 *      Any received messages will be programmatically deleted to prevent message from being fetched again by another consumer. \n
 *      MaxNumberOfMessages 10.
 *    requestBody:
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - autoDelete
 *           properties:
 *             autoDelete:
 *               type: boolean
 *               default: true
 *               example: true
 *    responses:
 *       200:
 *         description: A message
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                 status: "Ok",
 *                 Messages: [
 *                   {
 *                     MessageId: "1f1cc3b5-c1cd-4bb4-ac17-acb619d6dbc5",
 *                     ReceiptHandle: "AQEBDfCOu9lQcE4TA7DVqvvKZxjQzW9rPoexSvvw1Ipj9arO11/WLubM7hs+Yo0CrM+pRM2Cmq+Wq7eQ83XiupFVgZGU6RZJJ7V6Ma/jzepw8odUemqQwDOGkGqxzhwn460afNDwPluJIvf8GKOnzO7fTEMJrFstPC2K5/JxILTz++1cBj63hI/icBX7+694LNM7brtfWo2Ul6QtPwY0oAiMk3bhVih+s0mPf9DQcbcv4S9Tsfgajq51AS58NhA9fgklmESRfgnGijw/iXlcX/aPudbDOGtKMauD0ssI4KmZqlI=",
 *                     MD5OfBody: "71eeaf413f17d114989a837cea2d3988",
 *                     Body: "1729670430441",
 *                     Attributes: {
 *                       SentTimestamp: "1729670432704"
 *                     }
 *                   },
 *                 ]
 *               }
 */
router.post("/aws-sqs/receive", asyncHandler(AwsSqsController.receiveMessage));

/**
 * @swagger
 * /aws-sqs/delete:
 *   post:
 *    summary: Delete a message
 *    description: Delete a received message
 *    requestBody:
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - ReceiptHandle
 *           properties:
 *             ReceiptHandle:
 *               type: string
 *               description: The "ReceiptHandle" field from the received message body
 *               example: "AQEBDfCOu9lQcE4TA7DVqvvKZxjQzW9rPoexSvvw1Ipj9arO11/WLubM7hs+Yo0CrM+pRM2Cmq+Wq7eQ83XiupFVgZGU6RZJJ7V6Ma/jzepw8odUemqQwDOGkGqxzhwn460afNDwPluJIvf8GKOnzO7fTEMJrFstPC2K5/JxILTz++1cBj63hI/icBX7+694LNM7brtfWo2Ul6QtPwY0oAiMk3bhVih+s0mPf9DQcbcv4S9Tsfgajq51AS58NhA9fgklmESRfgnGijw/iXlcX/aPudbDOGtKMauD0ssI4KmZqlI="
 *    responses:
 *       200:
 *         description: A message
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                 status: "Ok"
 *               }
 */
router.post("/aws-sqs/delete", asyncHandler(AwsSqsController.deleteMessage));

export default router