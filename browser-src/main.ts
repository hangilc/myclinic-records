import * as $ from 'jquery'
import * as moment from "moment";
import * as kanjidate from "kanjidate"

import Moment = moment.Moment;

let dateInputForm = $("#date-input-form");

function setDate(m: Moment): void{
	let month = m.month() + 1;
	let day = m.date();
	let g = kanjidate.toGengou(m.year(), month, day);
	let form = dateInputForm;
	$("input[name=nen]", form).val(g.nen);
	$("input[name=month]", form).val(month);
	$("input[name=day]", form).val(day);
}

function getDate(): Moment{
	let gengou = "平成";
	let form = dateInputForm;
	let nen = +$("input[name=nen]", form).val();
	let month = +$("input[name=month]", form).val();
	let day = +$("input[name=day]", form).val();
	let year = kanjidate.fromGengou(gengou, nen);
	let m = moment({year: year, month: month - 1, date: day});
	if( m.isValid() ){
		return m;
	} else {
		return undefined;
	}
}

setDate(moment());

$("form#date-input-form .goto-today").click(function(event){
	event.preventDefault();
	setDate(moment());
});

$("form#date-input-form").submit(function(event){
	let m = getDate();
	if( !m ){
		alert("日付の入力が不適切です。");
		return;
	}
	console.log(m.format("YYYY-MM-DD"));
});

interface fromJson<T> {
	(Object): T
}

class UnRegisteredPatient {
	readonly lastName: string;
	readonly firstName: string;
	readonly lastNameYomi: string;
	readonly firstNameYomi: string;
	readonly birthday: string;
	readonly sex: string;
	readonly phone: string;
	readonly address: string;
	constructor(theLastName: string, theFirstName: string,
		theLastNameYomi: string, theFirstNameYomi: string,
		theBirthday: string, theSex: string, 
		thePhone: string, theAddress: string){
		if( theLastName === "" ){
			throw new Error("姓が不適切です。");
		}
		if( theFirstName === "" ){
			throw new Error("名が不適切です。");
		}
		if( theLastNameYomi === "" ){
			throw new Error("姓のよみが不適切です。");
		}
		if( theFirstNameYomi === "" ){
			throw new Error("名のよみが不適切です。");
		}
		if( /^\d{4}-\d{2}-\d{2}$/.test(theBirthday) ){
			if( theBirthday !== "0000-00-00" ){
				let m = moment(theBirthday);
				if( !m.isValid() ){
					throw new Error("生年月日が不適切です。");
				}
			}
		} else {
			throw new Error("生年月日が不適切です。");
		}
		if( !(theSex === "M" || theSex === "F") ){
			throw new Error("性が不適切です。");
		}
		this.lastName = theLastName;
		this.firstName = theFirstName;
		this.lastNameYomi = theLastNameYomi;
		this.firstNameYomi = theFirstNameYomi;
		this.birthday = theBirthday;
		this.sex = theSex;
		this.phone = thePhone;
		this.address = theAddress;
	}
}

class Patient extends UnRegisteredPatient {
	readonly patientId: number;
	constructor(thePatientId: number, 
		theLastName: string, theFirstName: string,
		theLastNameYomi: string, theFirstNameYomi: string,
		theBirthday: string, theSex: string, 
		thePhone: string, theAddress: string){
		super(theLastName, theFirstName, theLastNameYomi,
			theFirstNameYomi, theBirthday, theSex,
			thePhone, theAddress)
		if( !(thePatientId > 0) ){
			throw new Error("患者番号が不適切です。")
		}
		this.patientId = thePatientId;
	}
}

function fromObjectToPatient(obj: any): Patient {
	let patientId = obj.patient_id;
	let lastName = obj.last_name;
	let firstName = obj.first_name;
	let lastNameYomi = obj.last_name_yomi;
	let firstNameYomi = obj.first_name_yomi;
	let birthday = obj.birth_day;
	let sex = obj.sex;
	let phone = obj.phone;
	let address = obj.address;
	if( typeof patientId !== "number" ){
		throw new Error("患者番号が不適切です。")
	}
	if( typeof lastName !== "string" ){
		throw new Error("姓が不適切です。")
	}
	if( typeof firstName !== "string" ){
		throw new Error("名が不適切です。")
	}
	if( typeof lastNameYomi !== "string" ){
		throw new Error("姓のよみが不適切です。");
	}
	if( typeof firstNameYomi !== "string" ){
		throw new Error("名のよみが不適切です。");
	}
	if( typeof birthday !== "string" ){
		throw new Error("生年月日が不適切です。");
	}
	if( typeof phone !== "string" ){
		throw new Error("電話番号が不適切です。");
	}
	if( typeof address !== "string" ){
		throw new Error("住所が不適切です。");
	}
	return new Patient(patientId, lastName, firstName, lastNameYomi,
		firstNameYomi, birthday, sex, phone, address);
}

function request<T>(service: string, data: Object, 
	method: string, cvtor: fromJson<T>){
	return new Promise<T>(function(resolve, reject){
		$.ajax({
			url: '/service',
			type: method,
			data: Object.assign({
				_q: service
			}, data),
			dataType: "json",
			timeout: 15000,
			success: function(result){
				let ret: T = cvtor(result);
				try {
					resolve(ret);
				} catch(err){
					reject(err);
				}
			},
			error: function(xhr, status, ex){
				reject({
					status: status,
					text: xhr.responseText,
					ex: ex
				})
			}
		})
	});
}

function getPatient(patientId: number): Promise<Patient> {
	return request<Patient>("get_patient", { patient_id: patientId }, 
		"GET", fromObjectToPatient);
}

async function test(){
	let patient1: Patient = await getPatient(199);
	let patient2: Patient = await getPatient(patient1.patientId + 1);
	console.log(patient1);
	console.log(patient2);
}

test();
