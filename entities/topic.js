"use strict";

export default (sequelize, DataTypes)=> {
    return sequelize.define("topic", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        type: { type: DataTypes.ENUM('vocabulary', 'reading') }
    });
};