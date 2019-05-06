const gender = (sequelize, DataTypes) => {
    const Gender = sequelize.define('gender', {
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });

    Gender.findByCode = async code => {
        let gender = await Gender.findOne({
            where: { code: code },
        });

        return gender ? gender.id : null;
    };
    return Gender;
};

export default gender;
