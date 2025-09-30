module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Restaurant', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.TEXT, allowNull: false }
  }, {
    tableName: 'restaurants',
    timestamps: false
  });
};
