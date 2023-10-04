const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init(
    {
      isDone: DataTypes.BOOLEAN,
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
