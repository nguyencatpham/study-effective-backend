import {async} from 'asyncawait'
import _ from 'lodash'
import validator from 'validator'
import dateFormat from 'dateformat'
// import logger from '../../services/logger'

import topicService from '../../services/topicService'
// import customError from "../../helpers/customError"

export const baseController = {
    getAll: async(req, res, next) => {
        let result = await (topicService.getAll()
            .catch((err) => res.status(500).send()))
        res.status(200).send(result)
    },
    getById: async(req, res, next) => {
        let topic = await (topicService.getById(req.params.id)
            .catch((err) => res.status(500).send()))
        if (!topic) {
            return res.status(400).send('Topic has not exists')
        }

        res.status(200).send(topic)
    },

    getByName: async(req, res, next) => {
        let topic = await (topicService.getByName(req.params.name)
            .catch((err) => res.status(500).send()))

        if (!topic) {
            return res.status(400).send('Topic has not exists')
        }

        res.status(200).send(topic)
    },

    create: async(req, res, next) => {
        try {
            if (!req.body.name) {
                res.status(400).send()
            }

            let topic = await (topicService.getByName(req.body.name)
                .catch((err) => res.status(500).send()))

            if (topic) {
                res.status(400).send()
            }

            let params = {
                name: req.body.name,
                description: req.body.description
            }

            let result = await (topicService.create(params)
                .catch((err) => res.status(500).send()))

            res.status(201).send(result)

        } catch (error) {
            next(error)
        }
    },

    update: async(req, res, next) => {
        let topic = await (topicService.getById(req.params.id)
            .catch((err) => res.status(500).send()))

        if (!topic) {
            return res.status(400).send('Topic has not exists')
        }

        let topicByName = await (topicService.getByName(req.body.name)
            .catch((err) => res.status(500).send()))

        if (topicByName && topicByName.id != topic.id) {
            return res.status(400).send('Name has exists.')
        }

        let params = {
            name: req.body.name,
            description: req.body.description
        }

        let result = await (topicService.update(req.params.id, params)
            .catch((err) => res.status(500).send()))

        res.status(204).send()
    },

    delete: async(req, res, next) => {
        let topic = await (topicService.getById(req.params.id)
            .catch((err) => res.status(500).send()))

        if (!topic) {
            return res.status(400).send('Topic has not exists')
        }

        let result = await (topicService.delete(req.params.id)
            .catch((err) => res.status(500).send()))

        res.status(204).send()
    }
}
export default baseController