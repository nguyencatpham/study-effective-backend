import {async} from 'asyncawait'
import authentication from '../../filters/authentication'
import controller from './controller'
let express = require('express');

let router = express.Router()

/**
 * @swagger
 * /topics:
 *   get:
 *     tags:
 *       - Topics
 *     description: get all topics
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully'
 */
router.get('', controller.getAll);

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     tags:
 *       - Topics
 *     description: get a topic
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: topic's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Successfully'
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /topics/name/{name}:
 *   get:
 *     tags:
 *       - Topics
 *     description: get a topic
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: topic's name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Successfully'
 */
router.get('/name/:name', controller.getByName);

/**
 * @swagger
 * definition:
 *   topicRequest:
 *     properties:
 *       name:
 *          type: string
 *       description:
 *          type: string
 */

/**
 * @swagger
 * /topics:
 *   post:
 *     tags:
 *       - Topics
 *     description: create a topic
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: properties
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/topicRequest'
 *     responses:
 *       201:
 *         description: Successfully'
 */
router.post('', controller.create);

/**
 * @swagger
 * /topics/{id}:
 *   put:
 *     tags:
 *       - Topics
 *     description: update a topic
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: topic's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: name
 *         description: topic properties
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/topicRequest'
 *     responses:
 *       204:
 *         description: Successfully'
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /topics/{id}:
 *   delete:
 *     tags:
 *       - Topics
 *     description: delete a topic
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: topic's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Successfully'
 */
router.delete('/:id', controller.delete);

module.exports = router;