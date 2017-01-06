import * as $ from "jquery";
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
import IyakuhinMaster = model.IyakuhinMaster;
import ShinryouMaster = model.ShinryouMaster;
import KizaiMaster = model.KizaiMaster;

export class HttpError {
	constructor(
		readonly status: string,
		readonly text: string,
		readonly exception: string
	){}
}

interface Converter<T>{
	(src:any): T
}

function arrayConverter<T>(c: Converter<T>): Converter<T[]> {
	return function(src: any[]): T[] {
		return src.map(c);
	}
}

function request<T>(service: string, data: Object, 
	method: string, cvtor: Converter<T>){
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
				try {
					let obj = cvtor(result);
					resolve(obj);
				} catch(ex){
					reject(ex);
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
		"GET", model.jsonToPatient);
}

export function listVisitsByDate(at: string): Promise<Visit[]> {
	if( !(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at)) ){
		return Promise.reject("invalid at");
	}
	return request<Visit[]>("list_visits_by_date", { at: at }, "GET",
		arrayConverter(model.jsonToVisit));
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
		"GET", model.jsonToShahokokuho);
}

export function getKoukikourei(koukikoureiId: number): Promise<Koukikourei> {
	if( !(Number.isInteger(koukikoureiId) && koukikoureiId > 0) ){
		return Promise.reject("invalid koukikoureiId");
	}
	return request<Koukikourei>("get_koukikourei", { koukikourei_id: koukikoureiId }, 
		"GET", model.jsonToKoukikourei);
}

export function getRoujin(roujinId: number): Promise<Roujin> {
	if( !(Number.isInteger(roujinId) && roujinId > 0) ){
		return Promise.reject("invalid roujinId");
	}
	return request<Roujin>("get_roujin", { roujin_id: roujinId }, 
		"GET", model.jsonToRoujin);
}

export function getKouhi(kouhiId: number): Promise<Kouhi> {
	if( !(Number.isInteger(kouhiId) && kouhiId > 0) ){
		return Promise.reject("invalid kouhiId");
	}
	return request<Kouhi>("get_kouhi", { kouhi_id: kouhiId }, 
		"GET", model.jsonToKouhi);
}

export function getDrug(drugId: number): Promise<Drug> {
	if( !(Number.isInteger(drugId) && drugId > 0) ){
		return Promise.reject("invalid drugId");
	}
	return request<Drug>("get_drug", { drug_id: drugId }, 
		"GET", model.jsonToDrug);
}

export function getShinryou(shinryouId: number): Promise<Shinryou> {
	if( !(Number.isInteger(shinryouId) && shinryouId > 0) ){
		return Promise.reject("invalid shinryouId");
	}
	return request<Shinryou>("get_shinryou", { shinryou_id: shinryouId }, 
		"GET", model.jsonToShinryou);
}

export function getConduct(conductId: number): Promise<Conduct> {
	if( !(Number.isInteger(conductId) && conductId > 0) ){
		return Promise.reject("invalid conductId");
	}
	return request<Conduct>("get_conduct", { conduct_id: conductId }, 
		"GET", model.jsonToConduct);
}

/**
export function getGazouLabel(conductId: number): Promise<GazouLabel> {
	if( !(Number.isInteger(conductId) && conductId > 0) ){
		return Promise.reject("invalid conductId");
	}
	return request<GazouLabel>("get_gazou_label", { conduct_id: conductId }, 
		"GET", model.jsonToGazouLabel);
}

export function getConductDrug(conductDrugId: number): Promise<ConductDrug> {
	if( !(Number.isInteger(conductDrugId) && conductDrugId > 0) ){
		return Promise.reject("invalid conductDrugId");
	}
	return request<ConductDrug>("get_conduct_drug", { conduct_drug_id: conductDrugId }, 
		"GET", model.jsonToConductDrug);
}

export function getConductShinryou(conductShinryouId: number): Promise<ConductShinryou> {
	if( !(Number.isInteger(conductShinryouId) && conductShinryouId > 0) ){
		return Promise.reject("invalid conductShinryouId");
	}
	return request<ConductShinryou>("get_conduct_shinryou", { conduct_shinryou_id: conductShinryouId }, 
		"GET", model.jsonToConductShinryou);
}

export function getConductKizai(conductKizaiId: number): Promise<ConductKizai> {
	if( !(Number.isInteger(conductKizaiId) && conductKizaiId > 0) ){
		return Promise.reject("invalid conductKizaiId");
	}
	return request<ConductKizai>("get_conduct_kizai", { conduct_kizai_id: conductKizaiId }, 
		"GET", model.jsonToConductKizai);
}

export function getCharge(visitId: number): Promise<Charge> {
	if( !(Number.isInteger(visitId) && visitId > 0) ){
		return Promise.reject("invalid visitId");
	}
	return request<Charge>("get_charge", { visit_id: visitId }, 
		"GET", model.jsonToCharge);
}

export function getIyakuhinMaster(iyakuhincode: number, at: string): Promise<IyakuhinMaster> {
	if( !(Number.isInteger(iyakuhincode) && iyakuhincode > 0) ){
		return Promise.reject("invalid iyakuhincode");
	}
	if( !(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at)) ){
		return Promise.reject("invalid at");
	}
	return request<IyakuhinMaster>("get_iyakuhin_master", 
		{ iyakuhincode: iyakuhincode, at: at }, "GET", model.jsonToIyakuhinMaster);
}

export function getShinryouMaster(shinryoucode: number, at: string): Promise<ShinryouMaster> {
	if( !(Number.isInteger(shinryoucode) && shinryoucode > 0) ){
		return Promise.reject("invalid shinryoucode");
	}
	if( !(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at)) ){
		return Promise.reject("invalid at");
	}
	return request<ShinryouMaster>("get_shinryou_master", 
		{ shinryoucode: shinryoucode, at: at }, "GET", model.jsonToShinryouMaster);
}

export function getKizaiMaster(kizaicode: number, at: string): Promise<KizaiMaster> {
	if( !(Number.isInteger(kizaicode) && kizaicode > 0) ){
		return Promise.reject("invalid kizaicode");
	}
	if( !(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at)) ){
		return Promise.reject("invalid at");
	}
	return request<KizaiMaster>("get_kizai_master", 
		{ kizaicode: kizaicode, at: at }, "GET", model.jsonToKizaiMaster);
}

export function getFullVisit(visitId: number): Promise<FullVisit> {
	if( !(Number.isInteger(visitId) && visitId > 0) ){
		return Promise.reject("invalid visitId");
	}
	return request<FullVisit>("get_full_visit", { visit_id: visitId }, 
		"GET", model.jsonToFullVisit);
}

**/

