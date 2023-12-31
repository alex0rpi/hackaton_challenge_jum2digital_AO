export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.UserSkin, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
