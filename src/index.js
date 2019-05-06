import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import {
  initClaimType,
  initClaimUse,
  initCurrency,
  initGender,
  initOrganizationType }
from './utils/initValueSets';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Routes

app.use('/session', routes.session);
app.use('/patient', routes.patient);
app.use('/claim', routes.claim);
app.use('/claim/patient', routes.claimPatient);
// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    initClaimType();
    initClaimUse();
    initCurrency();
    initGender();
    initOrganizationType();
  }

  app.listen(process.env.PORT, () =>
    console.log(`FHIRR4 REST API. Listening on ${process.env.PORT}!`),
  );
});
