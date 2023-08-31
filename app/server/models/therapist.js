module.exports = (sequelize, DataTypes) => {

    const therapist = sequelize.define("therapist", { 
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

    return therapist;
};