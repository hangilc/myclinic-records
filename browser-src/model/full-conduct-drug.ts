import * as V from "../validation";
import { ConductDrug, validateConductDrug } from "./conduct-drug";
import { validateIyakuhinMaster } from "./iyakuhin-master";

export class FullConductDrug extends ConductDrug {
	constructor(
		conductDrugId: number,
		conductId: number,
		iyakuhincode: number,
		amount: number,
		readonly name: string,
		readonly yomi: string,
		readonly unit: string,
		readonly yakka: number,
		readonly madoku: number,
		readonly kouhatsu: boolean,
		readonly zaikei: number,
		readonly validFrom: string,
		readonly validUpto: string
	){
		super(conductDrugId, conductId, iyakuhincode, amount)
	}
}

export function validateFullConductDrug(drug: FullConductDrug): string[] {
	let errs: string[] = validateConductDrug(drug);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateIyakuhinMaster(drug));
	return errs;
}

export function fromJsonToFullConductDrug(src: any): [FullConductDrug, V.ValidationError] {
	let drug = new FullConductDrug(src.id, src.visit_conduct_id, 
			src.iyakuhincode, src.amount,
			src.name, src.yomi, src.unit,
			+src.yakka, +src.madoku, src.kouhatsu === 0 ? false : true,
			+src.zaikei, src.valid_from, src.valid_upto);
	let errs = validateFullConductDrug(drug);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [drug, null];
	}
}


