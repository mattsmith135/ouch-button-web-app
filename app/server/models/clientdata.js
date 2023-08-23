module.exports = (sequelize, DataTypes) => {

    const clientdata = sequelize.define("clientdata", {
        ClientID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ClientName: {
            type: DataTypes.STRING
        },
        ClientOuchButton: {
            type: DataTypes.INTEGER
        },
        TherapistID: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
    });

    return clientdata;
};