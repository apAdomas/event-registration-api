require('dotenv').config();

const app = require('./app');
const sequelize = require('../src/config/database');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to start the server:', err);
        process.exit(1);
    }
})();