const claimType = (sequelize, DataTypes) => {
    const ClaimType = sequelize.define('claim_type', {
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    });

    ClaimType.findByType = async code => {
        const claimTypeId = await ClaimType.findOne({
            where: { code },
        });
        return claimTypeId ? claimTypeId.id : null;
    };

    return ClaimType;
};

export default claimType;
