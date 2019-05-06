export const getPatientUpdatedFields = async (req) => {
    const requestBody = req.body;
    const genderId = requestBody.gender ? await req.context.models.Gender.findByCode(requestBody.gender) : null;
    return {
        ...genderId && { genderId: genderId },
        ...requestBody.address && { address: requestBody.address },
    }
};
