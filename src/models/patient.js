const patient = (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        address: DataTypes.STRING,
        birthDate: { type: DataTypes.DATE, allowNull: false, unique: 'compositeIndex'},
        firstName: { type: DataTypes.STRING, allowNull: false,  unique: 'compositeIndex'},
        lastName: { type: DataTypes.STRING, allowNull: false, unique: 'compositeIndex'},
    });

    Patient.associate = models => {
        Patient.belongsTo(models.Gender);
        Patient.hasMany(models.Claim, { onDelete: 'CASCADE' });
    };

    Patient.updatePatient = async (patientId, fields) => {
        return Patient.update(
            fields,{
            where: {
                id: patientId
            }
        });
    };

    return Patient;
};

export default patient;
