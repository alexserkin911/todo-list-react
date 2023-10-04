const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', 'qwerty', {
  host: 'localhost',
  dialect: 'postgres',
});

async function checkConnect() {
  try {
    await sequelize.authenticate();
    console.log('БАЗА ПОДКЛЮЧЕНА!');
  } catch (error) {
    console.log('БАЗА НЕ ПОДКЛЮЧЕНАЯ ==>', error);
  }
}
checkConnect();
