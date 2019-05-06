const claim = (sequelize, DataTypes) => {
    const Claim = sequelize.define('claim', {
        total: DataTypes.DECIMAL,
    });

    Claim.associate = models => {
        Claim.belongsTo(models.ClaimType);
        Claim.belongsTo(models.ClaimUse);
        Claim.belongsTo(models.Patient);
        Claim.belongsTo(models.Organization, {
            as: 'Insurer',
            foreignKey: 'insurerId',
            constraints: false
        });
        Claim.belongsTo(models.Organization,  {
            as: 'Provider',
            foreignKey: 'providerId',
            constraints: false
        });
        Claim.belongsTo(models.Currency);
    };

    Claim.updateClaim = async (claimId, fields) => {
        return Claim.update(
            fields,{
                where: {
                    id: claimId
                }
            });
    };

    return Claim;
};

export default claim;
