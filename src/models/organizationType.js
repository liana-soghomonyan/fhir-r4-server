const organizationType = (sequelize, DataTypes) => {
    const OrganizationType = sequelize.define('organization_type', {
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    });
    OrganizationType.associate = models => {
        OrganizationType.hasMany(models.Organization, {onDelete: 'CASCADE'});
    };
    return OrganizationType;
};

export default organizationType;
