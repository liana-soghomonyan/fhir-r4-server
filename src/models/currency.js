const currency = (sequelize, DataTypes) => {
    const Currency = sequelize.define('currency', {
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });

    Currency.findByCode = async code => {
        let currency = await Currency.findOne({
            where: { code: code },
        });

        return currency ? currency.id : null;
    };
    return Currency;
};

export default currency;
