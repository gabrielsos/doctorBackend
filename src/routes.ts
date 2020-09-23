import express from 'express';
import SpecialtyController from './controllers/SpecialtyController';
import DoctorController from './controllers/DoctorController';

const routes = express.Router();
const specialtyController = new SpecialtyController();
const doctorController = new DoctorController();

routes.post('/specialty', specialtyController.create);
routes.post('/doctor', doctorController.create);
routes.get('/doctor', doctorController.index);
routes.get('/doctor/:crm', doctorController.getByCrm);
routes.get('/specialty', specialtyController.index);
routes.delete('/doctor/:crm', doctorController.delete);
routes.put('/doctor', doctorController.update);

export default routes;
