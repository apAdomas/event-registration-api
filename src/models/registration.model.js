module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define(
        'Registration',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },

            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            event_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            registered_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW
            },
        },
        {
            tableName: 'registrations',
            timestamps: false,
        }
    );

    Registration.associate = (models) => {
        Registration.belongsTo(models.User, {foreignKey: 'user_id'});
        Registration.belongsTo(models.Event, {foreignKey: 'event_id'});
    };

    return Registration;
};