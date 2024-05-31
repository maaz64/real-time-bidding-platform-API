const { sequelize } = require('./setup');


beforeAll(async () => {
  await sequelize.sync({force:true});
});

afterAll(async () => {
  await sequelize.close();
});
