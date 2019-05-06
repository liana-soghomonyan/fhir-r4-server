import { Router } from 'express';
import { HTTP_STATUS_CODES } from '../constants';
import {
    claimPatientId,
    claimTypeId,
    claimUseId,
    currencyId,
    getClaimUpdatedFields,
    getOrganizatonId,
    validateClaimRequest,
}
from '../utils/claimUtils';


const router = Router();

router.get('/', async (req, res) => {
    const users = await req.context.models.Claim.findAll(
        {include: [
            {model: req.context.models.ClaimType},
            {model: req.context.models.ClaimUse},
            {model: req.context.models.Currency},
            {model: req.context.models.Organization, as: 'Insurer'},
            {model: req.context.models.Organization, as: 'Provider'},
            ]}
    );
    return res.send(users);
});

router.get('/:claimId', async (req, res) => {
    const isNotNumber = isNaN(req.params.claimId);
    if(isNotNumber) return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    const claim = await req.context.models.Claim.findByPk(
        req.params.claimId,
        {include: [
            {model: req.context.models.ClaimType},
            {model: req.context.models.ClaimUse},
            {model: req.context.models.Currency},
            {model: req.context.models.Organization, as: 'Insurer'},
            {model: req.context.models.Organization, as: 'Provider'},
        ]}
    );
    return res.send(claim);
});

router.post('/', async (req, res) => {
    try{
        const claimRequest = req.body;
        validateClaimRequest(claimRequest);

        const claim = await req.context.models.Claim.create({
            claimTypeId: await claimTypeId(req),
            claimUseId: await claimUseId(req, claimRequest.use),
            patientId: await claimPatientId(req, claimRequest),
            insurerId: await getOrganizatonId(req, true),
            providerId: await getOrganizatonId(req, false),
            total: claimRequest.total ? claimRequest.total.value : null,
            currencyId : await currencyId(req),
        });
        return res.send(claim);
    } catch (err){
        console.log(err);
    }
    return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
});

router.put('/:claimId', async (req, res) => {
    const response = await req.context.models.Claim.updateClaim(req.params.claimId, await getClaimUpdatedFields(req));
    return res.send(response);
});

router.delete('/:claimId', async (req, res) => {
    const result = await req.context.models.Claim.destroy({
        where: { id: req.params.claimId },
    });

    return res.sendStatus(HTTP_STATUS_CODES.SUCCESS);
});

export default router;
