export default (sequelize, DataTypes) => {
  const Skin = sequelize.define(
    'skins',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skinTextureHeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skinTextureWidth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skinTextureUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Skin;
};
