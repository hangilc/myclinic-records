import { Visit, validateVisit } from "./visit";
import { Text, validateText, fromJsonToText } from "./text";
import { Shahokokuho, validateShahokokuho, fromJsonToShahokokuho } from "./shahokokuho";
import { Koukikourei, validateKoukikourei, fromJsonToKoukikourei } from "./koukikourei";
import { Roujin, validateRoujin, fromJsonToRoujin } from "./roujin";
import { Kouhi, validateKouhi, fromJsonToKouhi } from "./kouhi";
import { FullDrug, validateFullDrug, fromJsonToFullDrug } from "./full-drug";
import { FullShinryou, validateFullShinryou, fromJsonToFullShinryou } from "./full-shinryou";
import { FullConduct, validateFullConduct, fromJsonToFullConduct } from "./full-conduct";
import { Charge, validateCharge, fromJsonToCharge } from "./charge";
import * as V from "../validation";

export class FullVisit extends Visit {
	constructor(
		visitId: number,
		patientId: number,
		visitedAt: string,
		shahokokuhoId: number,
		koukikoureiId: number,
		roujinId: number,
		kouhi1Id: number,
		kouhi2Id: number,
		kouhi3Id: number,
		readonly texts: Text[], 
		readonly shahokokuho: Shahokokuho | null,
		readonly koukikourei: Koukikourei | null,
		readonly roujin: Roujin | null,
		readonly kouhiList: Kouhi[],
		readonly drugs: FullDrug[],
		readonly shinryouList: FullShinryou[],
		readonly conducts: FullConduct[],
		readonly charge: Charge | null
	){
		super(visitId, patientId, visitedAt, shahokokuhoId,
			koukikoureiId, roujinId, kouhi1Id, kouhi2Id, kouhi3Id)
	}
}

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


