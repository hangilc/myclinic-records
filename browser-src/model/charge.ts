import { Value, NumberValue, StringValue, BooleanValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class Charge {
	visitId: number;
	charge: number;
}

export function jsonToCharge(src: any): Charge {
	let charge = new Charge();
	charge.visitId = src.visit_id;
	charge.charge = src.charge;
	return charge;
}

/*
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

export function fromJsonToCharge(src: any): Charge | V.ValidationError {
	let charge = new Charge(src.visit_id, src.charge);
	let errs = validateCharge(charge);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return charge;
	}
}
*/
