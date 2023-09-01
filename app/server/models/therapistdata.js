module.exports = (sequelize, DataTypes) => {

    const therapistdata = sequelize.define("therapistdata", { 
        TherapistID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        TherapistName: {
            type: DataTypes.STRING
        },
        TherapistEmail: {
            type: DataTypes.STRING
        },
        TherapistPassword: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });

    return therapistdata;
};