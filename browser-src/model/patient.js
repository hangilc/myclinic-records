"use strict";
const V = require("../validation");
class Patient {
    constructor(patientId, lastName, firstName, lastNameYomi, firstNameYomi, birthday, sex, address, phone) {
        this.patientId = patientId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.lastNameYomi = lastNameYomi;
        this.firstNameYomi = firstNameYomi;
        this.birthday = birthday;
        this.sex = sex;
        this.address = address;
        this.phone = phone;
    }
}
exports.Patient = Patient;
;
function validatePatient(patient, checkPatientId = true) {
    let errs = [];
    if (checkPatientId) {
        V.validate("患者番号", patient.patientId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ]);
    }
    V.validate("姓", patient.lastName, errs, [V.isString, V.isNotEmpty]);
    V.validate("名", patient.firstName, errs, [V.isString, V.isNotEmpty]);
    V.validate("姓のよみ", patient.lastNameYomi, errs, [V.isString, V.isNotEmpty]);
    V.validate("名のよみ", patient.firstNameYomi, errs, [V.isString, V.isNotEmpty]);
    V.validate("生年月日", patient.birthday, errs, [V.isString, V.isSqlDateOrZero]);
    V.validate("性別", patient.sex, errs, [V.isDefined, V.isString, V.isNotEmpty, V.isOneOf("M", "F")]);
    V.validate("住所", patient.address, errs, [V.isDefined, V.isString]);
    V.validate("電話番号", patient.phone, errs, [V.isDefined, V.isString]);
    return errs;
}
exports.validatePatient = validatePatient;
function fromJsonToPatient(src) {
    let patient = new Patient(src.patient_id, src.last_name, src.first_name, src.last_name_yomi, src.first_name_yomi, src.birth_day, src.sex, src.address, src.phone);
    let errs = validatePatient(patient, true);
    if (errs.length > 0) {
        return [undefined, new V.ValidationError(errs)];
    }
    else {
        return [patient, null];
    }
}
exports.fromJsonToPatient = fromJsonToPatient;
