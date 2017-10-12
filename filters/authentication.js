"use strict";

import {async} from 'asyncawait'
import userServices from '../services/userService'
import roleServices from '../services/roleService'

import apiAllowAnonymous from '../helper/apiAllowAnonymous'
import apiAuthorize from '../helper/apiAuthorize'
import helpCrypto from '../helper/crypto'
import _ from 'lodash'
import logger from '../services/logger'
import workContext from './workContext'

export default services = {
    // authorize 
    requireLogin: async(req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return res.status(401).send("Must have login");
            }

            let arrayToken = req.headers.authorization.split(' ');

            if (arrayToken.length != 2) {
                return res.status(401).send("Token incorrect format");
            }

            let bearer = arrayToken[0];
            let token = arrayToken[1];

            if (bearer != "Bearer") {
                return res.status(401).send("Token incorrect format");
            }

            if (!token) {
                return res.status(401).send("Token was empty");
            }

            token = decodeURIComponent(token);
            if (req.session.user && req.session.user[token]) {
                return next();
            }

            let userObj = await (userServices.getByToken(token).catch(function (err) {
                logger.logError(err);
                return res.sendStatus(500);
            }));

            if (!userObj) {
                return res.status(401).send("Token invalid");
            }

            let roles = await (roleServices.getByUserId(userObj.id).catch(function (err) {
                logger.logError(err);
                return res.sendStatus(500);
            }));
            req.session.user = req.session.user ? req.session.user : {};
            req.session.user[token] = userObj;
            req.session.user[token].roles = roles;

            return next();
        } catch (err) {
            res.status(400);
            return res.send(err);
        }
    },
    //get current user
    getCurrentUser: async(req, token) => {

        if (!token) {
            if (!req.headers.authorization)
                return null;

            token = helpCrypto.getTokenFromReqHeader(req.headers.authorization);
            if (!token) {
                return null;
            }
        }

        //return from session
        let user = req.session.user ? req.session.user[token] : null;
        if (user) {
            return user;
        }


        let userObj = await (userServices.getByToken(token).catch((err) => {
            return res.status(400).send(err);
        }));

        if (!userObj) {
            return null;
        }

        let roles = await (roleServices.getByUserId(userObj.id).catch((err) => {
            return res.status(400).send(err);
        }));

        req.session.user = req.session.user ? req.session.user : {};
        req.session.user[token] = userObj;
        req.session.user[token].roles = roles;

        return userObj;
    },
    // check role
    requireRole: (role) => (req, res, next) => {
        let token = helpCrypto.getTokenFromReqHeader(req.headers.authorization);
        let currentUser = getCurrentUser(req, token);

        if (currentUser &&
            currentUser.roles.map(function (a) {
                return a.name;
            }).every(elem => role.indexOf(elem) > -1))
            next();
        else
            res.send(403);
    },
    // allow for admin acess
    allowAdminAccessApi: async(req, res, next) => {
        let currentUser = getCurrentUser(req);

        if (!currentUser || _.every(currentUser.roles, (item) => {
                return item.name != 'Administrator'
            })) {
            return res.sendStatus(401);
        }

        return next();
    }
};
