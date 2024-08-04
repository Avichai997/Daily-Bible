import express from 'express';
import { createLog, getAllLogs } from '@Controllers/logController';

const router = express.Router();

router
  .route('/')
  /**
   * @openapi
   * /logs/:
   *   get:
   *     summary: Get all logs
   *     tags: [Logs]
   *     responses:
   *       200:
   *         description: List of logs
   */
  .get(getAllLogs)
  /**
   * @openapi
   * /Logs/:
   *   post:
   *     summary: Create a new log
   *     tags: [Logs]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user:
   *                 type: string
   *               action:
   *                 type: number
   *               description:
   *                 type: string
   *               sessionId:
   *                 type: string
   *     responses:
   *       201:
   *         description: Log created
   */
  .post(createLog);

export default router;
