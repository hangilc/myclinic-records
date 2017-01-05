import { Value, Undefined, makeValue } from "../value";

export class Patient {
 	constructor(
 		readonly patientId: number,
 		readonly lastName: string,
 		readonly firstName: string,
 		readonly lastNameYomi: string,
 		readonly firstNameYomi: string,
 		readonly birthday: string,
 		readonly sex: string,
 		readonly address: string,
 		readonly phone: string
 	){}
};

export class PatientValue {
 	constructor(
 		public patientIdValue: Value<number> = Undefined,
 		public lastNameValue: Value<string> = Undefined,
 		public firstNameValue: Value<string> = Undefined,
 		public lastNameYomiValue: Value<string> = Undefined,
 		public firstNameYomiValue: Value<string> = Undefined,
 		public birthdayValue: Value<string> = Undefined,
 		public sexValue: Value<string> = Undefined,
 		public addressValue: Value<string> = Undefined,
 		public phoneValue: Value<string> = Undefined
 	){}

 	set patientId(value: any){
		this.patientIdValue = makeValue(value)
			.ensureNumber()
			.isInteger()
			.isPositive()
 	}

 	set lastName(value: any){
 		this.lastNameValue = makeValue(value)
 			.ensureString()
 			.isNotEmpty()
 	}

 	set firstName(value: any){
 		this.firstNameValue = makeValue(value)
 			.ensureString()
 			.isNotEmpty()
 	}

 	set lastNameYomi(value: any){
 		this.lastNameYomiValue = makeValue(value)
 			.ensureString()
 			.isNotEmpty()
 	}

 	set firstNameYomi(value: any){
 		this.firstNameYomiValue = makeValue(value)
 			.ensureString()
 			.isNotEmpty()
 	}

 	set birthday(value: any){
 		this.birthdayValue = makeValue(value)
 			.ensureString()
 			.or(
 				v => v.isZeroSqlDate(),
 				v => v.isSqlDate().isValidDate()
			)
 	}

 	set sex(value: any){
 		this.sexValue = makeValue(value)
 			.ensureString()
 			.oneOf("M", "F")
 	}

 	set address(value: any){
 		this.address = makeValue(value)
 			.ensureString()
 	}

 	set phone(value: any){
 		this.phone = makeValue(value)
 			.ensureString()
 	}

 	toPatient(): Patient {
 		let err = {};
 		let patientId: number = this.patientIdValue.convert(e => err["患者番号"] = e, 0);
 		let lastName: string = this.lastNameValue.convert(e => err["姓"] = e, "");
 		let firstName: string = this.firstNameValue.convert(e => err["名"] = e, "");
 		let lastNameYomi: string = this.lastNameValue.convert(e => err["姓のよみ"] = e, "");
 		let firstNameYomi: string = this.firstNameValue.convert(e => err["名のよみ"] = e, "");
 		let birthday: string = this.birthdayValue.convert(e => err["生年月日"] = e, "");
 		let sex: string = this.birthdayValue.convert(e => err["性別"] = e, "");
 		let address: string = this.addressValue.convert(e => err["住所"] = e, "");
 		let phone: string = this.addressValue.convert(e => err["電話番号"] = e, "");
 		if( Object.keys(err).length > 0 ){
 			throw err;
 		} 
		return new Patient(patientId, lastName, firstName, lastNameYomi,
			firstNameYomi, birthday, sex, address, phone);
  	}

}

export function jsonToPatientValue(src: any): PatientValue {
	let v = new PatientValue();
	v.patientId = src.patient_id;
	v.lastName = src.last_name;
	v.firstName = src.first_name;
	v.lastNameYomi = src.last_name_yomi;
	v.firstNameYomi = src.first_name_yomi;
	v.birthday = src.birth_day;
	v.sex = src.sex;
	v.address = src.address;
	v.phone = src.phone;
	return v;
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

