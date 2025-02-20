module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'events',
            timestamps: true,
            underscored: true,
        }
    );

    Event.associate = (models) => {
        Event.hasMany(models.Registration, {foreignKey: 'event_id'});
    };

    return Event;
}