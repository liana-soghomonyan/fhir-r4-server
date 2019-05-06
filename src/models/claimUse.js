const claimUse = (sequelize, DataTypes) => {
    const ClaimUse = sequelize.define('claim_use', {
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });

    ClaimUse.findByCode = async code => {
        let claimUse = await ClaimUse.findOne({
            where: { code: code },
        });

        return claimUse ? claimUse.id : null;
    };

    return ClaimUse;
};

export default claimUse;
