export default (sequelize, User, Skin, DataTypes) => {
  const UserSkin = sequelize.define(
    'user_skin_purchases',
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
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'userId',
        },
      },
      skinId: {
        type: DataTypes.INTEGER,
        references: {
          model: Skin,
          key: 'id',
        },
      },
    },
    { timestamps: true }
  );
  UserSkin.associate = (models) => {
    UserSkin.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    UserSkin.belongsTo(models.Skin, {
      foreignKey: 'skinId',
    });
  };

  return UserSkin;
};
