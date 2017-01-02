import * as V from "../validation";

export class Conduct {
	constructor(
		readonly conductId: number,
		readonly visitId: number,
		readonly kind: number,
	){}
}

export function validateConduct(conduct: Conduct,
	checkConductId: boolean = true): string[] {
	let errs: string[] = [];
	if( checkConductId ){
		V.validate("conductId", conduct.conductId, errs, [
			V.isDefined, V.isInteger, V.isPositive
		]);
	}
	V.validate("visitId", conduct.visitId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("種類", conduct.kind, errs, [
		V.isDefined, V.isInteger, V.isZeroOrPositive
	]);
	return errs;
}

export function fromJsonToConduct(src: any): Conduct | V.ValidationError {
	let conduct = new Conduct(src.id, src.visit_id, src.kind);
	let errs = validateConduct(conduct, true);
	if( errs.length > 0 ){
		return new V.ValidationError(errs);
	} else {
		return conduct;
	}
}
