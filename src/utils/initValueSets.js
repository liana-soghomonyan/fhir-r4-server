import models from '../models';

export const initClaimType = async () => {
    await models.ClaimType.bulkCreate([
        {code: 'institutional'},
        {code: 'oral'},
        {code: 'pharmacy'},
        {code: 'professional'},
        {code: 'vision'}
    ]);
};

export const initClaimUse = async () => {
    await models.ClaimUse.bulkCreate([
        {code: 'claim'},
        {code: 'preauthorization'},
        {code: 'predetermination'}
    ]);
};

export const initCurrency = async () => {
    await models.Currency.bulkCreate([
        {code: 'USD'},
        {code: 'AED'},
        {code: 'AFN'},
        {code: 'AMD'}
    ]);
};

export const initGender = async () => {
    await models.Gender.bulkCreate([
        {code: 'male'},
        {code: 'female'},
        {code: 'other'},
        {code: 'unknown'}
    ]);
};

export const initOrganizationType = async () => {
    await models.OrganizationType.create({
        code: 'prov',
        organizations: [
            {name: 'Burgers University Medical Center'},
            {name: 'Clinical Lab'},
            {name: 'Blijdorp Medisch Centrum (BUMC)'}
        ],

    },{include: models.Organization});

    await models.OrganizationType.create({
        code: 'dept',
        organizations: [
            {name: 'Department A'},
            {name: 'Department B'},
            {name: 'Department C'}
        ],

    },{include: models.Organization});

    await models.OrganizationType.create({
        code: 'ins',
        organizations: [
            {name: 'Insurance A'},
            {name: 'Insurance B'},
            {name: 'Insurance C'}]
    },{include: models.Organization});

    await models.OrganizationType.bulkCreate([
        {code: 'team'},
        {code: 'govt'},
        {code: 'pay'},
        {code: 'edu'},
        {code: 'reli'},
        {code: 'crs'},
        {code: 'cg'},
        {code: 'bus'},
        {code: 'other'},
    ]);
};
