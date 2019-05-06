import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  Claim: sequelize.import('./claim'),
  ClaimType: sequelize.import('./claimType'),
  ClaimUse: sequelize.import('./claimUse'),
  Currency: sequelize.import('./currency'),
  Gender: sequelize.import('./gender'),
  Patient: sequelize.import('./patient'),
  Organization: sequelize.import('./organization'),
  OrganizationType: sequelize.import('./organizationType'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
