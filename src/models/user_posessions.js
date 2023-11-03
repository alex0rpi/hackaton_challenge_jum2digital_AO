export default (sequelize, User, Skin, DataTypes) => {
  const UserSkin = sequelize.define(
    'users_skins',
    {
      purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  UserSkin.belongsTo(User, {
    foreignKey: 'userId',
  });

  UserSkin.belongsTo(Skin, {
    foreignKey: 'skinId',
  });

  return UserSkin;
};
