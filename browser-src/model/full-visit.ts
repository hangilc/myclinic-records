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
		readonly shahokokuho: Shahokokuho,
		readonly koukikourei: Koukikourei,
		readonly roujin: Roujin,
		readonly kouhiList: Kouhi[],
		readonly drugs: FullDrug[],
		readonly shinryouList: FullShinryou[],
		readonly conducts: FullConduct[],
		readonly charge: Charge
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

export function fromJsonToFullVisit(src: any): [FullVisit, V.ValidationError] {
	let texts: Text[] = src.texts.map(s => {
		let [result, err] = fromJsonToText(s);
		if( err ){
			return [undefined, err];
		}
		return result;
	});
	let shahokokuho: Shahokokuho = null;
	if( src.shahokokuho ){
		let [result, err] = fromJsonToShahokokuho(src.shahokokuho);
		if ( err ){
			return [undefined, err];
		}
		shahokokuho = result;
	}
	let koukikourei: Koukikourei = null;
	if( src.koukikourei ){
		let [result, err] = fromJsonToKoukikourei(src.koukikourei);
		if ( err ){
			return [undefined, err];
		}
		koukikourei = result;
	}
	let roujin: Roujin = null;
	if( src.roujin ){
		let [result, err] = fromJsonToRoujin(src.roujin);
		if ( err ){
			return [undefined, err];
		}
		roujin = result;
	}
	let kouhiList: Kouhi[] = [];
	if( src.kouhi_list ){
		kouhiList = src.kouhi_list.map(function(srcKouhi){
			let [kouhi, err] = fromJsonToKouhi(srcKouhi)
			if( err ){
				return [undefined, err];
			}
			return kouhi;
		});
	}
	let drugs: FullDrug[] = src.drugs.map(s => {
		let [result, err] = fromJsonToFullDrug(s);
		if( err ){
			return [undefined, err];
		}
		return result;
	});
	let shinryouList: FullShinryou[] = src.shinryou_list.map(s => {
		let [result, err] = fromJsonToFullShinryou(s);
		if( err ){
			return [undefined, err];
		}
		return result;
	});
	let conducts: FullConduct[] = src.conducts.map(s => {
		let [result, err] = fromJsonToFullConduct(s);
		if( err ){
			return [undefined, err];
		}
		return result;
	});
	let charge: Charge = null;
	if( src.charge ){
		let [result, err] = fromJsonToCharge(src.charge);
		if( err ){
			return [undefined, err];
		}
		charge = result;
	}
	let visit = new FullVisit(src.visit_id, src.patient_id, src.v_datetime,
		src.shahokokuho_id, src.koukikourei_id, src.roujin_id,
		src.kouhi_1_id, src.kouhi_2_id, src.kouhi_3_id,
		texts, shahokokuho, koukikourei, roujin, kouhiList,
		drugs, shinryouList, conducts, charge);
	let errs = validateFullVisit(visit);
	console.log(src);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [visit, null];
	}
}


