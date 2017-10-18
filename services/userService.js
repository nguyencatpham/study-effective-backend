"use strict";
import {async} from 'asyncawait'
import _ from 'lodash'
import Promise from 'bluebird'
import path from 'path'
import config from "config"
import entities from '../entities/user'
import camelResult from '../helpers/camelResult'

let tsconfig = config.get("host")
// define key cache
let user_by_pattern = 'user.by'
let user_by_token = 'user.by.{0}'

export const services = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            let query = `select u.id, u.userName, u.email, u.phoneNumber, u.firstName, u.lastName, u.isActive
             from users u
             order by u.userName;`
            entities.sequelize.query(query, {
                type: entities.sequelize.QueryTypes.SELECT
            }).then((resp) => {
                resp = _.map(resp, (item) => camelResult.convertObj(item))
                resolve({
                    totalRecords: resp.length,
                    records: resp
                });
            }).catch((err) => {
                reject(err);
            })
        });
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            entities.users.findOne({
                where: {
                    Id: userId
                }
            }).then((resp) => {
                if (!resp.length)
                    return resolve(null);

                resolve(camelResult.convertObj(resp.dataValues));
            }).catch((err) => {
                reject(err);
            })
        });
    },
    /**
     * get user by username
     * @param userName
     */
    getByUserName: (userName) => {
        return new Promise((resolve, reject) => {
            let query = 'select * from users where userName = :userName limit 1'

            entities.sequelize.query(query, {
                    type: entities.sequelize.QueryTypes.SELECT,
                    replacements: {
                        userName: userName
                    }
                })
                .then((resp) => {
                    // We don't need spread here, since only the results will be returned for select queries
                    if (!resp.length) {
                        resolve(null);
                    }

                    resolve(camelResult.convertObj(resp[0]));
                }).catch((err) => {
                    reject(err);
                });
        });
    },
    /**
     * create user
     * @param user
     */
    create: (data) => {
        return new Promise((resolve, reject) => {
            entities.users.create(data).then((resp, err) => {
                if (err) {
                    reject(err);
                }

                resolve(resp.dataValues);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    /**
     * get user by token
     * @param token
     */
    getByToken: async((token) => {
        return new Promise((resolve, reject) => {
            var query = 'select u.* from user u join token t on u.Id = t.UserId where t.acceptToken = :token \
            and t.Expired >= current_timestamp() and t.isSignedOut = 0 limit 1';

            entities.sequelize.query(query, {
                replacements: {
                    token: token
                },
                type: entities.sequelize.QueryTypes.SELECT
            }).then((users) => {
                if (!users.length) {
                    resolve(null);
                }

                resolve(camelResult.convertObj(users[0]));
            }).catch((err) => {
                reject(err);
            });
        });
    }),
    /**
     * update user
     * @param id
     * @param data
     */
    update: (id, data) => {
        return new Promise((resolve, reject) => {
            entities.users.update(data, {
                where: {
                    id: id
                }
            }).then((resp, err) => {
                if (err) {
                    reject(err);
                }

                resolve(resp);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    /**
     * delete user
     * @param id
     */
    delete: (id) => {
        return new Promise((resolve, reject) => {
            entities.users.destroy({
                where: {
                    id: id
                }
            }).then((resp, err) => {
                if (err) {
                    reject(err);
                }

                resolve(resp);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
export default services