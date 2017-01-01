import * as $ from "jquery";
import { ValidationError } from "./validation";
import * as model from "./model";

import Patient = model.Patient;
import Visit = model.Visit;
import Text = model.Text;
import Shahokokuho = model.Shahokokuho;
import Koukikourei = model.Koukikourei;
import Roujin = model.Roujin;
import Kouhi = model.Kouhi;
import Drug = model.Drug;
import Shinryou = model.Shinryou;
import Conduct = model.Conduct;
import GazouLabel = model.GazouLabel;
import ConductDrug = model.ConductDrug;
import ConductShinryou = model.ConductShinryou;
import ConductKizai = model.ConductKizai;
import Charge = model.Charge;
import FullVisit = model.FullVisit;

export class HttpError {
	constructor(
		readonly status: string,
		readonly text: string,
		readonly exception: string
	){}
}

interface fromJson<T> {
	(json: any) : [T, ValidationError]
}

function fromJsonArray<T>(cvtor: fromJson<T>): fromJson<T[]> {
	return function(json: any) : [T[], ValidationError] {
		if( Array.isArray(json) ){
			let list: any[] = <any[]>json;
			let ret: T[] = [];
			for(let i=0;i<list.length;i++){
				let item = list[i];
				let [v, e] : [T, ValidationError] = cvtor(item);
				if( e ){
					return [undefined, e];
				}
				ret.push(v);
			}
			return [ret, undefined];
		} else {
			return [undefined, new ValidationError(["array expected"])];
		}
	}
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
				let [ret, err]: [T, ValidationError] = cvtor(result);
				if( err ){
					reject(err);
				} else {
					resolve(ret);
				}
			},
			error: function(xhr, status, ex){
				reject(new HttpError(status, xhr.responseText, ex));
			}
		})
	});
}

export function getPatient(patientId: number): Promise<Patient> {
	if( !(Number.isInteger(patientId) && patientId > 0) ){
		return Promise.reject("invalid patientId");
	}
	return request<Patient>("get_patient", { patient_id: patientId }, 
		"GET", model.fromJsonToPatient);
}

export function listVisitsByDate(at: string): Promise<Visit[]> {
	if( !(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at)) ){
		return Promise.reject("invalid at");
	}
	return request<Visit[]>("list_visits_by_date", { at: at }, "GET",
		fromJsonArray(model.fromJsonToVisit));
}

export function getText(textId: number): Promise<Text> {
	if( !(Number.isInteger(textId) && textId > 0) ){
		return Promise.reject("invalid textId");
	}
	return request<Text>("get_text", { text_id: textId }, 
		"GET", model.fromJsonToText);
}

export function getShahokokuho(shahokokuhoId: number): Promise<Shahokokuho> {
	if( !(Number.isInteger(shahokokuhoId) && shahokokuhoId > 0) ){
		return Promise.reject("invalid shahokokuhoId");
	}
	return request<Shahokokuho>("get_shahokokuho", { shahokokuho_id: shahokokuhoId }, 
		"GET", model.fromJsonToShahokokuho);
}

export function getKoukikourei(koukikoureiId: number): Promise<Koukikourei> {
	if( !(Number.isInteger(koukikoureiId) && koukikoureiId > 0) ){
		return Promise.reject("invalid koukikoureiId");
	}
	return request<Koukikourei>("get_koukikourei", { koukikourei_id: koukikoureiId }, 
		"GET", model.fromJsonToKoukikourei);
}

export function getRoujin(roujinId: number): Promise<Roujin> {
	if( !(Number.isInteger(roujinId) && roujinId > 0) ){
		return Promise.reject("invalid roujinId");
	}
	return request<Roujin>("get_roujin", { roujin_id: roujinId }, 
		"GET", model.fromJsonToRoujin);
}

export function getKouhi(kouhiId: number): Promise<Kouhi> {
	if( !(Number.isInteger(kouhiId) && kouhiId > 0) ){
		return Promise.reject("invalid kouhiId");
	}
	return request<Kouhi>("get_kouhi", { kouhi_id: kouhiId }, 
		"GET", model.fromJsonToKouhi);
}

export function getDrug(drugId: number): Promise<Drug> {
	if( !(Number.isInteger(drugId) && drugId > 0) ){
		return Promise.reject("invalid drugId");
	}
	return request<Drug>("get_drug", { drug_id: drugId }, 
		"GET", model.fromJsonToDrug);
}

export function getShinryou(shinryouId: number): Promise<Shinryou> {
	if( !(Number.isInteger(shinryouId) && shinryouId > 0) ){
		return Promise.reject("invalid shinryouId");
	}
	return request<Shinryou>("get_shinryou", { shinryou_id: shinryouId }, 
		"GET", model.fromJsonToShinryou);
}

export function getConduct(conductId: number): Promise<Conduct> {
	if( !(Number.isInteger(conductId) && conductId > 0) ){
		return Promise.reject("invalid conductId");
	}
	return request<Conduct>("get_conduct", { conduct_id: conductId }, 
		"GET", model.fromJsonToConduct);
}

export function getGazouLabel(conductId: number): Promise<GazouLabel> {
	if( !(Number.isInteger(conductId) && conductId > 0) ){
		return Promise.reject("invalid conductId");
	}
	return request<GazouLabel>("get_gazou_label", { conduct_id: conductId }, 
		"GET", model.fromJsonToGazouLabel);
}

export function getConductDrug(conductDrugId: number): Promise<ConductDrug> {
	if( !(Number.isInteger(conductDrugId) && conductDrugId > 0) ){
		return Promise.reject("invalid conductDrugId");
	}
	return request<ConductDrug>("get_conduct_drug", { conduct_drug_id: conductDrugId }, 
		"GET", model.fromJsonToConductDrug);
}

export function getConductShinryou(conductShinryouId: number): Promise<ConductShinryou> {
	if( !(Number.isInteger(conductShinryouId) && conductShinryouId > 0) ){
		return Promise.reject("invalid conductShinryouId");
	}
	return request<ConductShinryou>("get_conduct_shinryou", { conduct_shinryou_id: conductShinryouId }, 
		"GET", model.fromJsonToConductShinryou);
}

export function getConductKizai(conductKizaiId: number): Promise<ConductKizai> {
	if( !(Number.isInteger(conductKizaiId) && conductKizaiId > 0) ){
		return Promise.reject("invalid conductKizaiId");
	}
	return request<ConductKizai>("get_conduct_kizai", { conduct_kizai_id: conductKizaiId }, 
		"GET", model.fromJsonToConductKizai);
}

export function getCharge(visitId: number): Promise<Charge> {
	if( !(Number.isInteger(visitId) && visitId > 0) ){
		return Promise.reject("invalid visitId");
	}
	return request<Charge>("get_charge", { visit_id: visitId }, 
		"GET", model.fromJsonToCharge);
}

export function getFullVisit(visitId: number): Promise<FullVisit> {
	if( !(Number.isInteger(visitId) && visitId > 0) ){
		return Promise.reject("invalid visitId");
	}
	return request<FullVisit>("get_full_visit", { visit_id: visitId }, 
		"GET", model.fromJsonToFullVisit);
}



