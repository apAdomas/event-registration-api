module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4, // deprecated from seq 7 => DataTypes.UUID.V4 instead
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            timestamps: true,
            underscored: true,
        }
    );

    /**
     * User can have many registrations
     * @param models
     */
    User.associate = (models) => {
        User.hasMany(models.Registration, {foreignKey: 'user_id'});
    };

    return User;
};