import express from "express";
import asyncHandler from "express-async-handler";
import AwsSnsController from "../domain/aws-sns.controller.js";

const router = express.Router();

/**
 * @swagger
 * /aws-sns/publish:
 *   post:
 *     summary: Publish message
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
 *                   "ResponseMetadata": {
 *                      "RequestId": "be711f9d-f805-5396-a5ab-4007d699c30b"
 *                    },
 *                    "MessageId": "005929ee-7dad-520a-9a9b-767453319297",
 *                    "SequenceNumber": "10000000000000014000"
 *                 }
 *               }
 */
router.post("/aws-sns/publish", asyncHandler(AwsSnsController.publishToSNSTopic));

export default router
