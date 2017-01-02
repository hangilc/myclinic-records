import * as V from "../validation";
import { Conduct, validateConduct } from "./conduct";
import { FullConductShinryou, validateFullConductShinryou,
	fromJsonToFullConductShinryou } from "./full-conduct-shinryou";
import { FullConductDrug, validateFullConductDrug,
	fromJsonToFullConductDrug } from "./full-conduct-drug";
import { FullConductKizai, validateFullConductKizai,
	fromJsonToFullConductKizai } from "./full-conduct-kizai";

export class FullConduct extends Conduct {
	constructor(
		conductId,
		visitId,
		kind,
		readonly gazouLabel: string | null,
		readonly drugs: FullConductDrug[],
		readonly shinryouList: FullConductShinryou[],
		readonly kizaiList: FullConductKizai[],
	){
		super(conductId, visitId, kind)
	}
}

export function validateFullConduct(conduct: FullConduct): string[] {
	let errs = validateConduct(conduct);
	V.validate("画像ラベル", conduct.gazouLabel, errs, [
		V.isDefined, V.isOptionalString
	]);
	conduct.drugs.forEach(s => {
		errs = errs.concat(validateFullConductDrug(s));
	})
	conduct.shinryouList.forEach(s => {
		errs = errs.concat(validateFullConductShinryou(s));
	})
	conduct.kizaiList.forEach(s => {
		errs = errs.concat(validateFullConductKizai(s));
	})
	return errs;
}

export function fromJsonToFullConduct(src: any): FullConduct | V.ValidationError {
	let gazouLabel: string | null;
	{
		let val = src.gazou_label;
		if( typeof val === "string" ){
			gazouLabel = val;
		} else if( val === undefined || val === null ){
			gazouLabel = null;
		} else {
			return new V.ValidationError(["invalid gazou_label"]);
		}
	}
	let drugs: FullConductDrug[];
	{
		let result = V.mapConvert(src.drugs, fromJsonToFullConductDrug);
		if( result instanceof V.ValidationError ){
			return result;
		} else {
			drugs = result;
		}
	}
	let shinryouList: FullConductShinryou[];
	{
		let result = V.mapConvert(src.shinryou_list, fromJsonToFullConductShinryou);
		if( result instanceof V.ValidationError ){
			return result;
		} else {
			shinryouList = result;
		}
	}
	let kizaiList: FullConductKizai[];
	{
		let result = V.mapConvert(src.kizai_list, fromJsonToFullConductKizai);
		if( result instanceof V.ValidationError ){
			return result;
		} else {
			kizaiList = result;
		}
	}
	let conduct = new FullConduct(src.id, src.visit_id, src.kind, gazouLabel,
		drugs, shinryouList, kizaiList);
	let errs = validateFullConduct(conduct);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return conduct;
	}
}
