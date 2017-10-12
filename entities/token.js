"use strict";

export default (sequelize, DataTypes)=> {
    return sequelize.define("token", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        acceptToken: DataTypes.STRING,
        refreshToken: DataTypes.STRING,
        expired: DataTypes.DATE,
        isSignedOut: DataTypes.BOOLEAN,
        userId: DataTypes.INTEGER
    });
};