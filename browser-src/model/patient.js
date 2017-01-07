"use strict";
const value_1 = require("../value");
class Patient {
}
exports.Patient = Patient;
;
class PatientValues {
}
exports.PatientValues = PatientValues;
function hasError(values) {
    return values.patientId.isError || values.lastName.isError ||
        values.firstName.isError || values.lastNameYomi.isError ||
        values.firstNameYomi.isError || values.birthday.isError ||
        values.sex.isError || values.address.isError ||
        values.phone.isError;
}
function validatePatient(patient) {
    let v = new PatientValues();
    v.patientId = value_1.ensureNumber(patient.patientId)
        .isInteger()
        .isPositive();
    v.lastName = value_1.ensureString(patient.lastName)
        .isNotEmpty();
    v.firstName = value_1.ensureString(patient.firstName)
        .isNotEmpty();
    v.lastNameYomi = value_1.ensureString(patient.lastNameYomi)
        .isNotEmpty();
    v.firstNameYomi = value_1.ensureString(patient.firstNameYomi)
        .isNotEmpty();
    v.birthday = value_1.ensureString(patient.birthday)
        .isSqlDate()
        .isZeroOrValidDate();
    v.sex = value_1.ensureString(patient.sex)
        .oneOf("M", "F");
    v.address = value_1.ensureString(patient.address);
    v.phone = value_1.ensureString(patient.phone);
    if (hasError(v)) {
        return v;
    }
    else {
        return null;
    }
}
exports.validatePatient = validatePatient;
function jsonToPatient(src) {
    let p = new Patient();
    p.patientId = src.patient_id;
    p.lastName = src.last_name;
    p.firstName = src.first_name;
    p.lastNameYomi = src.last_name_yomi;
    p.firstNameYomi = src.first_name_yomi;
    p.birthday = src.birth_day;
    p.sex = src.sex;
    p.address = src.address;
    p.phone = src.phone;
    return p;
}
exports.jsonToPatient = jsonToPatient;
// export function convertToPatient(src: any): Patient | ValidationError {
// 	let patientIdValue: number;
// 	let lastNameValue: string;
// 	let firstNameValue: string;
// 	let lastNameYomiValue: string;
// 	let firstNameYomiValue: string;
// 	let birthdayValue: string;
// 	let sexValue: string;
// 	let addressValue: string;
// 	let phoneValue: string;
// 	let err = {};
// 	{
// 		let cvt = new Validator(src.patient_id)
// 			.isDefined()
// 			.ensureNumber()
// 			.isInteger()
// 			.isPositive()
// 		if( cvt.hasError ){
// 			err["患者番号"] = cvt.getError();
// 			patientIdValue = 0;
// 		} else {
// 			patientIdValue = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.last_name)
// 			.isDefined()
// 			.ensureString()
// 			.isNotEmpty();
// 		if( cvt.hasError ){
// 			err["姓"] = cvt.getError();
// 			lastNameValue = "";
// 		} else {
// 			lastNameValue = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.first_name)
// 			.isDefined()
// 			.ensureString()
// 			.isNotEmpty();
// 		if( cvt.hasError ){
// 			err["名"] = cvt.getError();
// 			firstNameValue = "";
// 		} else {
// 			firstNameValue = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.last_name_yomi)
// 			.isDefined()
// 			.ensureString()
// 			.isNotEmpty();
// 		if( cvt.hasError ){
// 			err["姓のよみ"] = cvt.getError();
// 			lastNameYomiValue = "";
// 		} else {
// 			lastNameYomiValue = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.first_name_yomi)
// 			.isDefined()
// 			.ensureString()
// 			.isNotEmpty();
// 		if( cvt.hasError ){
// 			err["名のよみ"] = cvt.getError();
// 			firstNameYomiValue = "";
// 		} else {
// 			firstNameYomiValue = cvt.getValue();
// 		}
// 	}
// 	{
// 		let value = src.birth_day;
// 		if( value === "0000-00-00" ){
// 			birthdayValue = value;
// 		} else {
// 			let cvt = new Validator(src.birth_day)
// 				.isDefined()
// 				.ensureString()
// 				.matches(/^\d{4}-\d{2}^\d{2}$/)
// 				.isValidDate()
// 			if( cvt.hasError ){
// 				err["生年月日"] = cvt.getError();
// 				birthdayValue = "";
// 			} else {
// 				birthdayValue = value;
// 			}
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.sex)
// 			.isDefined()
// 			.ensureString()
// 			.oneOf(["M", "F"])
// 		if( cvt.hasError ){
// 			err["性別"]　= cvt.getError();
// 			sexValue = "";
// 		} else {
// 			sexValue = cvt.getValue()
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.address)
// 			.isDefined()
// 			.ensureString()
// 		if( cvt.hasError ){
// 			err["住所"] = cvt.getError();
// 			addressValue = "";
// 		} else {
// 			addressValue = cvt.getValue();
// 		}
// 	}
// 	{
// 		let cvt = new Validator(src.phone)
// 			.isDefined()
// 			.ensureString()
// 		if( cvt.hasError ){
// 			err["電話番号"] = cvt.getError();
// 			phoneValue = "";
// 		} else {
// 			phoneValue = cvt.getValue();
// 		}
// 	}
// 	if( Object.keys(err).length > 0 ){
// 		return new ValidationError(err);
// 	}
// 	return new Patient(patientIdValue, lastNameValue,
// 		firstNameValue, lastNameYomiValue,
// 		firstNameYomiValue, birthdayValue,
// 		sexValue, addressValue, phoneValue);
// }
/**
export function validatePatient(patient: Patient,
    checkPatientId: boolean = true) : null | any {
    return validateObject(patient, {

    })
    let errs: string[] = [];
    if( checkPatientId ){
        V.validate("患者番号", patient.patientId, errs, [
            V.isDefined, V.isInteger, V.isPositive
        ])
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

export function fromJsonToPatient(src: any) : Patient | V.ValidationError {
    let patient = new Patient(src.patient_id, src.last_name,
        src.first_name, src.last_name_yomi, src.first_name_yomi,
        src.birth_day, src.sex, src.address, src.phone);
    let errs = validatePatient(patient, true);
    if( errs.length > 0 ){
        return new V.ValidationError(errs);
    } else {
        return patient;
    }
}

**/
