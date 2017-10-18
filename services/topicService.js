"use strict";

import {async} from 'asyncawait'
import entities from '../entities/topic'
import path from 'path'
import config from "config"
import _ from 'lodash'
import camelResult from '../helpers/camelResult'
import util from 'util'

let tsconfig = config.get("host")

export const topicServices = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            let query = 'select * from topic'

            entities.sequelize.query(query, {
                type: entities.sequelize.QueryTypes.SELECT
            }).then((resp) => {
                resolve(camelResult.convertArr(resp))
            }).catch((err) => {
                reject(err)
            })
        })
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            let query = 'select * from topic where Id = :id  limit 1'

            entities.sequelize.query(query, {
                    type: entities.sequelize.QueryTypes.SELECT,
                    replacements: {
                        id: id
                    }
                })
                .then((resp) => {
                    // We don't need spread here, since only the results will be returned for select queries
                    if (!resp.length) {
                        resolve(null)
                    }

                    resolve(camelResult.convertObj(resp[0]))
                }).catch((err) => {
                    reject(err)
                })
        })
    },

    getByName: (name) => {
        return new Promise((resolve, reject) => {
            let query = 'select * from topic where name = :name  limit 1'

            entities.sequelize.query(query, {
                    type: entities.sequelize.QueryTypes.SELECT,
                    replacements: {
                        name: name
                    }
                })
                .then((resp) => {
                    // We don't need spread here, since only the results will be returned for select queries
                    if (!resp.length) {
                        resolve(null)
                    }

                    resolve(camelResult.convertObj(resp[0]))
                }).catch((err) => {
                    reject(err)
                })
        })
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            entities.topic.create(data).then((resp, err) => {
                if (err) {
                    reject(err)
                }

                resolve(resp.dataValues)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    update: (id, data) => {
        return new Promise((resolve, reject) => {
            entities.topic.update(data, {
                where: {
                    id: id
                }
            }).then((resp, err) => {
                if (err) {
                    reject(err)
                }

                resolve(resp)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            entities.topic.destroy({
                where: {
                    id: id
                }
            }).then((resp, err) => {
                if (err) {
                    reject(err)
                }

                resolve(resp)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
export default topicServices