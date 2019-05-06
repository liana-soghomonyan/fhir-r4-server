const organization = (sequelize, DataTypes) => {
    const Organization = sequelize.define('organization', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Organization.associate = models => {
        Organization.hasMany(models.Claim, {foreignKey: 'insurerId'});
        Organization.hasMany(models.Claim, {foreignKey: 'providerId'});
        Organization.belongsTo(models.OrganizationType);
    };
    return Organization;
};

export default organization;
