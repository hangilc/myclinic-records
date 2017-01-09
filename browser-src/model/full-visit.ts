import { Visit, fillVisitFromJson } from "./visit";
import { Text, jsonToText } from "./text";
import { Shahokokuho, jsonToShahokokuho, shahokokuhoRep } from "./shahokokuho";
import { Koukikourei, jsonToKoukikourei, koukikoureiRep } from "./koukikourei";
import { Roujin, jsonToRoujin, roujinRep } from "./roujin";
import { Kouhi, jsonToKouhi, kouhiRep } from "./kouhi";
import { FullDrug, jsonToFullDrug } from "./full-drug";
import { FullShinryou, jsonToFullShinryou } from "./full-shinryou";
import { FullConduct, jsonToFullConduct } from "./full-conduct";
import { Charge, jsonToCharge } from "./charge";

export class FullVisit extends Visit {
	texts: Text[]; 
	shahokokuho: Shahokokuho | null;
	koukikourei: Koukikourei | null;
	roujin: Roujin | null;
	kouhiList: Kouhi[];
	drugs: FullDrug[];
	shinryouList: FullShinryou[];
	conducts: FullConduct[];
	charge: Charge | null;
}

function opt<T>(src: any, cvt: (s: any) => T): T | null {
	if( src === null || src === undefined ){
		return null;
	} else {
		return cvt(src);
	}
}

export function jsonToFullVisit(src: any){
	let visit = new FullVisit();
	fillVisitFromJson(visit, src);
	visit.texts = src.texts.map(jsonToText);
	visit.shahokokuho = opt(src.shahokokuho, jsonToShahokokuho);
	visit.koukikourei = opt(src.koukikourei, jsonToKoukikourei);
	visit.roujin = opt(src.roujin, jsonToRoujin);
	visit.kouhiList = src.kouhi_list.map(jsonToKouhi);
	visit.drugs = src.drugs.map(jsonToFullDrug);
	visit.shinryouList = src.shinryou_list.map(jsonToFullShinryou);
	visit.conducts = src.conducts.map(jsonToFullConduct);
	visit.charge = opt(src.charge, jsonToCharge);
	return visit;
}

export function hokenRep(visit: FullVisit): string {
	let items: string[] = [];
	if( visit.shahokokuho !== null ){
		items.push(shahokokuhoRep(visit.shahokokuho));
	}
	if( visit.koukikourei !== null ){
		items.push(koukikoureiRep(visit.koukikourei));
	}
	if( visit.roujin !== null ){
		items.push(roujinRep(visit.roujin));
	}
	items = items.concat(visit.kouhiList.map(kouhiRep));
	return items.length > 0 ? items.join("・") : "保険なし";
}

/*

export function validateFullVisit(visit: FullVisit): string[] {
	let errs: string[];
	errs = validateVisit(visit);
	visit.texts.forEach(t => {
		errs = errs.concat(validateText(t));
	})
	if( visit.shahokokuho ){
		errs = errs.concat(validateShahokokuho(visit.shahokokuho));
	}
	if( visit.koukikourei ){
		errs = errs.concat(validateKoukikourei(visit.koukikourei));
	}
	if( visit.roujin ){
		errs = errs.concat(validateRoujin(visit.roujin));
	}
	if( visit.kouhiList ){
		visit.kouhiList.forEach(function(kouhi){
			errs = errs.concat(validateKouhi(kouhi));
		})
	}
	visit.drugs.forEach(t => {
		errs = errs.concat(validateFullDrug(t));
	})
	visit.shinryouList.forEach(s => {
		errs = errs.concat(validateFullShinryou(s));
	})
	visit.conducts.forEach(t => {
		errs = errs.concat(validateFullConduct(t));
	})
	if( visit.charge ){
		errs = errs.concat(validateCharge(visit.charge));
	}
	return errs;
}

export function fromJsonToFullVisit(src: any): FullVisit | V.ValidationError {
	let texts: Text[];
	{
		let result = V.mapConvert(src.texts, fromJsonToText);
		if( result instanceof V.ValidationError ){
			return result;
		}
		texts = result;		
	}
	let shahokokuho: Shahokokuho | null = null;
	if( src.shahokokuho ){
		let result = fromJsonToShahokokuho(src.shahokokuho);
		if( result instanceof V.ValidationError ){
			return result;
		}
		shahokokuho = result;
	}
	let koukikourei: Koukikourei | null = null;
	if( src.koukikourei ){
		let result = fromJsonToKoukikourei(src.koukikourei);
		if( result instanceof V.ValidationError ){
			return result;
		}
		koukikourei = result;
	}
	let roujin: Roujin | null = null;
	if( src.roujin ){
		let result = fromJsonToRoujin(src.roujin);
		if ( result instanceof V.ValidationError ){
			return result;
		}
		roujin = result;
	}
	let kouhiList: Kouhi[];
	{
		let result = V.mapConvert(src.kouhi_list, fromJsonToKouhi);
		if( result instanceof V.ValidationError ){
			return result;
		}
		kouhiList = result;
	}
	let drugs: FullDrug[];
	{
		let result = V.mapConvert(src.drugs, fromJsonToFullDrug);
		if( result instanceof V.ValidationError ){
			return result;
		}
		drugs = result;
	}
	let shinryouList: FullShinryou[];
	{
		let result = V.mapConvert(src.shinryou_list, fromJsonToFullShinryou);
		if( result instanceof V.ValidationError ){
			return result;
		}
		shinryouList = result;
	}
	let conducts: FullConduct[];
	{
		let result = V.mapConvert(src.conducts, fromJsonToFullConduct);
		if( result instanceof V.ValidationError ){
			return result;
		}
		conducts = result;
	}
	let charge: Charge | null = null;
	if( src.charge ){
		let result = fromJsonToCharge(src.charge);
		if( result instanceof V.ValidationError ){
			return result;
		} else {
			charge = result;
		}
	}
	let visit = new FullVisit(src.visit_id, src.patient_id, src.v_datetime,
		src.shahokokuho_id, src.koukikourei_id, src.roujin_id,
		src.kouhi_1_id, src.kouhi_2_id, src.kouhi_3_id,
		texts, shahokokuho, koukikourei, roujin, kouhiList,
		drugs, shinryouList, conducts, charge);
	let errs = validateFullVisit(visit);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return visit;
	}
}

*/
