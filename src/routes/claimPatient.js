import { Router } from 'express';
import { HTTP_STATUS_CODES } from '../constants';
const router = Router();

router.get('/:patientId', async (req, res) => {
    const isNotNumber = isNaN(req.params.patientId);
    if(isNotNumber) return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    const patientClaims = await req.context.models.Claim.findAll(
        {
            where: {
                patientId: req.params.patientId
            },
            include: [
            {model: req.context.models.Patient},
            {model: req.context.models.ClaimType},
            {model: req.context.models.ClaimUse},
            {model: req.context.models.Currency},
            {model: req.context.models.Organization, as: 'Insurer'},
            {model: req.context.models.Organization, as: 'Provider'},
        ]}
    );
    return patientClaims ? res.send(patientClaims) : res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
});

export default router;