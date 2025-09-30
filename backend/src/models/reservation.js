module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reservation', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
    reservation_date: { type: DataTypes.STRING, allowNull: false },
    group_size: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.STRING }
  }, {
    tableName: 'reservations',
    timestamps: false
  });
};
