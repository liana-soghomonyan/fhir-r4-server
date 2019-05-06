import { Router } from 'express';
import { HTTP_STATUS_CODES } from '../constants';
import { getPatientUpdatedFields } from '../utils/patientUtils'
const router = Router();

router.get('/', async (req, res) => {
    try{
        const patients = await req.context.models.Patient.findAll(
            {include: [
                {model: req.context.models.Gender},
            ]}
        );
        return res.send(patients);
    } catch (ex) {
        console.log(ex);
    }
    return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
});

router.get('/:patientId', async (req, res) => {
    try{
        const isNotNumber = isNaN(req.params.patientId);
        if(isNotNumber) return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        const patient = await req.context.models.Patient.findByPk(
            req.params.patientId,
            {include: [
                {model: req.context.models.Gender},
            ]}
        );
        return patient ? res.send(patient) : res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
    } catch (ex) {
        console.log(ex);
    }
    return res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
});

router.post('/', async (req, res) => {
    try{
        const humanName = (req.body.name && req.body.name.length) ? req.body.name[0] : null;
        if (!humanName) {
            return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        };

        const patient = await req.context.models.Patient.create({
            lastName: humanName.family,
            firstName: humanName.given && humanName.given.length ? humanName.given[0] : null,
            birthDate: req.body.birthDate ? new Date(req.body.birthDate) : null,
            genderId: await req.context.models.Gender.findByCode(req.body.gender)
        });

        return res.send(patient);

    } catch (ex){
        console.log(ex);
    }
    return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
});

router.put('/:patientId', async (req, res) => {
    try{
        await req.context.models.Patient.updatePatient(req.params.patientId, await getPatientUpdatedFields(req));
        return res.sendStatus(HTTP_STATUS_CODES.SUCCESS);
    } catch (ex) {
        console.log(ex);
    }
    return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
});

router.delete('/:patientId', async (req, res) => {
    try{
        await req.context.models.Patient.destroy({
            where: { id: req.params.patientId },
        });
        return res.sendStatus(HTTP_STATUS_CODES.SUCCESS);
    }catch (ex) {
        console.log(ex);
    }
    return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
});


export default router;
