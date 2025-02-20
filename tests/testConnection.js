const sequelize = require('../src/config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB established successfully.');
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
  } finally {
    await sequelize.close();
  }
})();
