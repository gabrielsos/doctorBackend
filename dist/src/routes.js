"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var SpecialtyController_1 = __importDefault(require("./controllers/SpecialtyController"));
var DoctorController_1 = __importDefault(require("./controllers/DoctorController"));
var routes = express_1.default.Router();
var specialtyController = new SpecialtyController_1.default();
var doctorController = new DoctorController_1.default();
routes.post('/specialty', specialtyController.create);
routes.post('/doctor', doctorController.create);
routes.get('/doctor', doctorController.index);
routes.delete('/doctor', doctorController.delete);
routes.put('/doctor', doctorController.update);
exports.default = routes;
