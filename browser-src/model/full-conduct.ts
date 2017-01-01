import * as V from "../validation";
import { Conduct, validateConduct } from "./conduct";
import { FullConductShinryou, validateFullConductShinryou,
	fromJsonToFullConductShinryou } from "./full-conduct-shinryou";

export class FullConduct extends Conduct {
	constructor(
		conductId,
		visitId,
		kind,
		readonly gazouLabel: string,
		readonly shinryouList: FullConductShinryou[],
	){
		super(conductId, visitId, kind)
	}
}

export function validateFullConduct(conduct: FullConduct): string[] {
	let errs = validateConduct(conduct);
	V.validate("画像ラベル", conduct.gazouLabel, errs, [
		V.isDefined, V.isOptionalString
	]);
	conduct.shinryouList.forEach(s => {
		errs = errs.concat(validateFullConductShinryou(s));
	})
	return errs;
}

export function fromJsonToFullConduct(src: any): [FullConduct, V.ValidationError] {
	let shinryouList = src.shinryou_list.map(s => {
		let [result, err] = fromJsonToFullConductShinryou(s);
		if( err ){
			return [undefined, err];
		}
		return result;
	})

	let conduct = new FullConduct(src.id, src.visit_id, src.kind, src.gazou_label,
		shinryouList);
	let errs = validateFullConduct(conduct);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [conduct, null];
	}
}
