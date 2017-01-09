import { Value, ensureNumber, ensureString, NumberValue, StringValue } from "../value";
import * as moment from "moment";
import * as kanjidate from "kanjidate";

export class Patient {
	public patientId: number;
	public lastName: string;
	public firstName: string;
	public lastNameYomi: string;
	public firstNameYomi: string;
	public birthday: string;
	public sex: string;
	public address: string;
	public phone: string;
};

export class PatientValues {
	public patientId: NumberValue;
	public lastName: StringValue;
	public firstName: StringValue;
	public lastNameYomi: StringValue;
	public firstNameYomi: StringValue;
	public birthday: StringValue;
	public sex: StringValue;
	public address: StringValue;
	public phone: StringValue
}

export function patientBirthdayRep(patient: Patient): string {
	let b = patient.birthday;
	if( b === "0000-00-00" ){
		return "";
	}
	let m = moment(b);
	if( !m.isValid() ){
		return `（生年月日が不適切：${ b }）`;
	}
	return kanjidate.format(kanjidate.f2, m.format("YYYY-MM-DD")) + "生";
}

export function patientAge(patient: Patient): number {
	let m = moment(patient.birthday);
	return moment().diff(m, "years");
}

export function patientSexRep(patient: Patient): string {
	switch(patient.sex){
		case "M": return "男";
		case "F": return "女";
		default: return "不明";
	}
}

function hasError(values: PatientValues): boolean {
	return values.patientId.isError || values.lastName.isError || 
		values.firstName.isError || values.lastNameYomi.isError || 
		values.firstNameYomi.isError || values.birthday.isError || 
		values.sex.isError || values.address.isError || 
		values.phone.isError;
}

export function validatePatient(patient: Patient): null | PatientValues {
	let v = new PatientValues();
	v.patientId = ensureNumber(patient.patientId)
		.isInteger()
		.isPositive()
	v.lastName = ensureString(patient.lastName)
		.isNotEmpty()
	v.firstName = ensureString(patient.firstName)
		.isNotEmpty()
	v.lastNameYomi = ensureString(patient.lastNameYomi)
		.isNotEmpty()
	v.firstNameYomi = ensureString(patient.firstNameYomi)
		.isNotEmpty()
	v.birthday = ensureString(patient.birthday)
		.isSqlDate()
		.isZeroOrValidDate()
	v.sex = ensureString(patient.sex)
		.oneOf("M", "F")
	v.address = ensureString(patient.address)
	v.phone = ensureString(patient.phone)
	if( hasError(v) ){
		return v;
	} else {
		return null;
	}
}

export function jsonToPatient(src: any): Patient {
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

