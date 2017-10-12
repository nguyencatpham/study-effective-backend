"use strict";

export default (sequelize, DataTypes)=> {
    return sequelize.define("user_studied", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: { type: DataTypes.INTEGER},
        topicDetailId: { type: DataTypes.INTEGER},
        point: { type: DataTypes.INTEGER },
        studyCount: { type: DataTypes.INTEGER },
        recentStudy: { type: DataTypes.DATE },
    });
};