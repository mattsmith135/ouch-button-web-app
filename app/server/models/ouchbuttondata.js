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
        Latitude: {
            type: DataTypes.DECIMAL(8, 6)
        }, 
        Longitude: {
            type: DataTypes.DECIMAL(9, 6) 
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