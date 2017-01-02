import * as V from "../validation";

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

export function validatePatient(patient: Patient, 
	checkPatientId: boolean = true) : string[] {
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



