const app = require('./app');
const { sequelize } = require('./models');
const port = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database synced');
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => console.error('DB sync error:', err));


