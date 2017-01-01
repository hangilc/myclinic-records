import * as V from "../validation";

export class Charge {
	constructor(
		readonly visitId: number,
		readonly charge: number,
	){}
}

export function validateCharge(charge: Charge): string[] {
	let errs: string[] = [];
	V.validate("visitId", charge.visitId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("金額", charge.charge, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	return errs;
}

export function fromJsonToCharge(src: any): [Charge, V.ValidationError] {
	let charge = new Charge(src.visit_id, src.charge);
	let errs = validateCharge(charge);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [charge, null];
	}
}
