module.exports = (sequelize, DataTypes) => {

    const ouchbuttondata = sequelize.define("ouchbuttondata", {
        OuchButtonDataID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        OuchButtonID: {
            type: DataTypes.INTEGER
        },
        Location: {
            type: DataTypes.STRING
        },
        Time: {
            type: DataTypes.DATE
        },
        ClientID: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
    });

    return ouchbuttondata;
};