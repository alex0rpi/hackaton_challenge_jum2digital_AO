export default (sequelize, User, Skin) => {
  const UserSkin = sequelize.define('users_skins', {}, { timestamps: true });
  User.belongsToMany(Skin, {
    through: UserSkin,
    foreignKey: 'userId',
    otherKey: 'skinId',
  });
  Skin.belongsToMany(User, {
    through: UserSkin,
    foreignKey: 'skinId',
    otherKey: 'userId',
  });

  return UserSkin;
};
