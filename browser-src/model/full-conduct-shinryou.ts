import * as V from "../validation";
import { ConductShinryou, validateConductShinryou } from "./conduct-shinryou";
import { validateShinryouMaster } from "./shinryou-master";

export class FullConductShinryou extends ConductShinryou {
	constructor(
		conductShinryouId: number,
		conductId: number,
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
		super(conductShinryouId, conductId, shinryoucode)
	}
}

export function validateFullConductShinryou(shinryou: FullConductShinryou): string[] {
	let errs: string[] = validateConductShinryou(shinryou);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateShinryouMaster(shinryou));
	return errs;
}

export function fromJsonToFullConductShinryou(src: any): [FullConductShinryou, V.ValidationError] {
	let shinryou = new FullConductShinryou(src.id, src.visit_conduct_id, src.shinryoucode,
		src.name, +src.tensuu,
		+src.tensuu_shikibetsu, src.houkatsukensa, +src.oushinkubun, 
		src.kensagroup, +src.roujintekiyou, +src.code_shou, 
		src.code_bu, src.code_alpha, src.code_kubun, src.valid_from, src.valid_upto);
	let errs = validateFullConductShinryou(shinryou);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [shinryou, null];
	}
}


