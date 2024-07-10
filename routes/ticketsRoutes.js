// const express = require("express");
// const authenticationUser = require("../config/validationToken");
// const {
//   createTicket,
//   viewAllTickets,
//   deleteUserTicket,
// } = require("../controllers/ticketControllers");
// const router = express.Router();

// router.post("/createticket", authenticationUser, createTicket);
// router.get("/viewalltickets", authenticationUser, viewAllTickets);
// router.delete("/deleteticket/:id", authenticationUser, deleteUserTicket);

// module.exports = router;

const express = require("express");
const authenticationUser = require("../config/validationToken");
const {
  createTicket,
  viewAllTickets,
  deleteUserTicket,
} = require("../controllers/ticketControllers");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the ticket
 *         title:
 *           type: string
 *           description: The title of the ticket
 *         description:
 *           type: string
 *           description: The description of the ticket
 *         status:
 *           type: string
 *           enum: [open, in-progress, closed]
 *           description: The status of the ticket
 *         assignedTo:
 *           type: string
 *           description: The user id of the agent assigned to the ticket
 *         createdBy:
 *           type: string
 *           description: The user id of the customer who created the ticket
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the ticket was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the ticket was last updated
 *       example:
 *         title: "Cannot login to my account"
 *         description: "I am unable to login to my account with my credentials."
 *         status: "open"
 *         assignedTo: "60d5ec49eb3b9a6f0f4c7f65"
 *         createdBy: "60d5ec49eb3b9a6f0f4c7f64"
 *         createdAt: "2024-07-09T12:34:56Z"
 *         updatedAt: "2024-07-09T12:34:56Z"
 */

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management
 */

/**
 * @swagger
 * /api/user/createticket:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: The ticket was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       500:
 *         description: Some server error
 */
router.post("/createticket", authenticationUser, createTicket);

/**
 * @swagger
 * /api/user/viewalltickets:
 *   get:
 *     summary: View all tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       500:
 *         description: Server error
 */
router.get("/viewalltickets", authenticationUser, viewAllTickets);

/**
 * @swagger
 * /api/user/deleteticket/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: The ticket was successfully deleted
 *       404:
 *         description: The ticket was not found
 *       500:
 *         description: Some server error
 */
router.delete("/deleteticket/:id", authenticationUser, deleteUserTicket);

module.exports = router;
