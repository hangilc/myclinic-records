import * as V from "../validation";
import { ConductKizai, validateConductKizai } from "./conduct-kizai";
import { validateKizaiMaster } from "./kizai-master";

export class FullConductKizai extends ConductKizai {
	constructor(
		conductKizaiId: number,
		conductId: number,
		kizaicode: number,
		amount: number,
		readonly name: string,
		readonly yomi: string,
		readonly unit: string,
		readonly kingaku: number,
		readonly validFrom: string,
		readonly validUpto: string
	){
		super(conductKizaiId, conductId, kizaicode, amount)
	}
}

export function validateFullConductKizai(kizai: FullConductKizai): string[] {
	let errs: string[] = validateConductKizai(kizai);
	if( errs.length > 0 ){
		return errs;
	}
	errs = errs.concat(validateKizaiMaster(kizai));
	return errs;
}

export function fromJsonToFullConductKizai(src: any): [FullConductKizai, V.ValidationError] {
	let kizai = new FullConductKizai(src.id, src.visit_conduct_id, 
			src.kizaicode, src.amount,src.name, src.yomi, src.unit,
		+src.kingaku, src.valid_from, src.valid_upto);
	let errs = validateFullConductKizai(kizai);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [kizai, null];
	}
}


