"use strict";

import entities from '../entities'
import Promise from 'bluebird'

export default services = {
    /**
     * get token by accept token
     * @param acceptToken
     */
    getByAcceptToken: (acceptToken) => {
        return new Promise((resolve, reject) => {
            entities.tokens.findOne({
                where: {
                    acceptToken: acceptToken
                }
            }).then((e) => {
                resolve(e);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    /**
     * get token by refresh token
     * @param refreshToken
     */
    getByRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            entities.tokens.findOne({
                where: {
                    refreshToken: refreshToken
                }
            }).then((e) => {
                resolve(e);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * get token by user
     * @param userId
     */
    getByUser: (userId) => {
        return new Promise((resolve, reject) => {
            entities.tokens.findAll({
                where: {
                    userId: userId
                }
            }).then((e) => {
                resolve(e);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * create token
     * @param token
     */
    create: (token) => {
        return new Promise((resolve, reject) => {
            entities.tokens.create(token).then((e) => {
                resolve(e);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    logout: (acceptToken) => {
        return new Promise((resolve, reject) => {
            var data = {
                isSignedOut: true
            };

            entities.tokens.update(data, {
                where: {
                    acceptToken: acceptToken
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