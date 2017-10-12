"use strict";

export default (sequelize, DataTypes)=> {
    return sequelize.define("topic_detail", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        topicId: { type: DataTypes.INTEGER},
        title: { type: DataTypes.STRING },
        content: { type: DataTypes.STRING },
    });
};