"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var ClassesController = /** @class */ (function () {
    function ClassesController() {
    }
    ClassesController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default.raw("select d.*, group_concat(distinct e.name separator ', ') as specialty from doctor d inner join doctor_specialty de on (d.crm = de.doctor_crm) inner join specialty e on (de.specialty_id = e.id) group by d.id")];
                    case 1:
                        doctor = _a.sent();
                        return [2 /*return*/, response.json(doctor)];
                }
            });
        });
    };
    ClassesController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var crm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        crm = request.body.crm;
                        return [4 /*yield*/, connection_1.default('doctor').delete().where('doctor.crm', '=', crm)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection_1.default('doctor_specialty').delete().where('doctor_specialty.doctor_crm', '=', crm)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json({ status: 'done' })];
                }
            });
        });
    };
    ClassesController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, crm, telephone, city, state, specialtyId, i, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = request.body, name = _a.name, crm = _a.crm, telephone = _a.telephone, city = _a.city, state = _a.state, specialtyId = _a.specialtyId;
                        return [4 /*yield*/, connection_1.default('doctor').update({
                                name: name,
                                crm: crm,
                                telephone: telephone,
                                city: city,
                                state: state
                            }).where('doctor.crm', '=', crm)];
                    case 1:
                        _c.sent();
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < specialtyId.length)) return [3 /*break*/, 8];
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, connection_1.default('doctor_specialty').delete('*').where('doctor_crm', '=', crm)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, connection_1.default('doctor_specialty')
                                .insert({
                                doctor_crm: crm,
                                specialty_id: specialtyId
                            })];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _b = _c.sent();
                        console.log('especialidade ja cadastrada');
                        return [3 /*break*/, 7];
                    case 7:
                        i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, response.json({ status: 'done' })];
                }
            });
        });
    };
    ClassesController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, crm, telephone, city, state, specialtyId, trx, i, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, crm = _a.crm, telephone = _a.telephone, city = _a.city, state = _a.state, specialtyId = _a.specialtyId;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 9, , 11]);
                        return [4 /*yield*/, trx('doctor').insert({
                                name: name,
                                crm: crm,
                                telephone: telephone,
                                city: city,
                                state: state,
                            })];
                    case 3:
                        _b.sent();
                        i = 0;
                        _b.label = 4;
                    case 4:
                        if (!(i < specialtyId.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, trx('doctor_specialty').insert({
                                doctor_crm: crm,
                                specialty_id: specialtyId[i]
                            })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, trx.commit()];
                    case 8:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                    case 9:
                        err_1 = _b.sent();
                        return [4 /*yield*/, trx.rollback()];
                    case 10:
                        _b.sent();
                        return [2 /*return*/, response.status(400).json({
                                error: 'Unexpected error while creating new doctor'
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return ClassesController;
}());
exports.default = ClassesController;
