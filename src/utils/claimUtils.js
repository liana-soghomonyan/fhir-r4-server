export const validateClaimRequest  = claimRequest => {
    if(!claimRequest || !claimRequest.patient || !claimRequest.patient.reference)
        throw new Error('Bad request. Patient is not defined');
}

export const claimPatientId  = async request => {
    const claimRequest = request.body;
    const patientId = claimRequest.patient.reference.substr(claimRequest.patient.reference.lastIndexOf('/') + 1);
    const patientIdValid = await request.context.models.Patient.findOne({
        where: { id: patientId },
    });
    console.log(patientIdValid);
    if (!patientIdValid) throw new Error('Bad request. Patient id is not defined in patients table');
    return patientId;
}
export const currencyId = async request => {
    const claimRequest = request.body;
    if(claimRequest.total && claimRequest.total.currency){
        return await request.context.models.Currency.findByCode(claimRequest.total.currency);
    }
    return null;
}

export const organizationId  = async (request, partialUrl) => {
    const orgId  = partialUrl.substr(partialUrl.lastIndexOf('/') + 1);
    const orgIdValid = orgId && await request.context.models.Organization.findOne({where: { id: orgId }});
    return orgIdValid ? orgId : null;
}

export const claimTypeId = async (request) => {
    const claimType = request.body.type;
    const claimTypeCode =
        (claimType && claimType.coding && claimType.coding.length > 0 && claimType.coding[0].code)
            ? claimType.coding[0].code
            : null;

    return await request.context.models.ClaimType.findByType(claimTypeCode);
}

export const getOrganizatonId = async (request, isInsurer) => {
    const claimRequest = request.body;
    if(isInsurer) {

        return (claimRequest.insurer &&  claimRequest.insurer.reference)
                ? await organizationId(request, claimRequest.insurer.reference) : null;
    }

    return (claimRequest.provider && claimRequest.provider.reference)
        ? await organizationId(request, claimRequest.provider.reference) : null;

}

export const claimUseId = async request => {
    const claimRequest = request.body;
    return await request.context.models.ClaimUse.findByCode(claimRequest.use);
}

export const getClaimUpdatedFields = async (request) => {
    const claimRequest = request.body;
    const typeId = await claimTypeId(request);
    const useId = await claimUseId(request, claimRequest.claimUse);
    const insurerId = await getOrganizatonId(request, true);
    const providerId = await getOrganizatonId(request, false);

    return {
        ...typeId && { claimTypeId: typeId },
        ...useId && { claimUseId: useId },
        ...insurerId && { insurerId: insurerId },
        ...providerId && { providerId: providerId },
        ...(claimRequest.total && claimRequest.total.value) && {total: claimRequest.total.value}
    }
};