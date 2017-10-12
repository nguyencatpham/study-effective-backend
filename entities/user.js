"use strict";

export default (sequelize, DataTypes)=> {
    return sequelize.define("user", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        guid: { type: DataTypes.STRING },
        userName: { type: DataTypes.STRING },
        passwordSalt: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        passwordHash: { type: DataTypes.STRING },
        firstName: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        birthday: { type: DataTypes.STRING },
        pin: { type: DataTypes.STRING },
        isActive: { type: DataTypes.BOOLEAN },
        isDeleted: { type: DataTypes.BOOLEAN },
        gender: { type: DataTypes.ENUM('male', 'female') }
    });
};