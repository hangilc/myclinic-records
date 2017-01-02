import * as V from "../validation";
import { Shinryou, validateShinryou } from "./shinryou";
import { validateShinryouMaster } from "./shinryou-master";

export class FullShinryou extends Shinryou {
	constructor(
		shinryouId: number,
		visitId: number,
		shinryoucode: number,
		readonly name: string,
		readonly tensuu: number,
		readonly tensuuShikibetsu: number,
		readonly houketsuKensa: string,
		readonly oushinKubun: number,
		readonly kensaGroup: string,
		readonly roujinTekiyou: number,
		readonly codeShou: number,
		readonly codeBu: string,
		readonly codeAlpha: string,
		readonly codeKubun: string,
		readonly validFrom: string,
		readonly validUpto: string
	){
		super(shinryouId, visitId, shinryoucode)
	}
}

export function validateFullShinryou(shinryou: FullShinryou): string[] {
	let errs: string[] = validateShinryou(shinryou);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateShinryouMaster(shinryou));
	return errs;
}

export function fromJsonToFullShinryou(src: any): FullShinryou | V.ValidationError {
	let shinryou = new FullShinryou(src.shinryou_id, src.visit_id, src.shinryoucode,
		src.name, +src.tensuu,
		+src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, 
		src.kensagroup, +src.roujintekiyou, +src.code_shou, 
		src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
	let errs = validateFullShinryou(shinryou);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return shinryou;
	}
}


