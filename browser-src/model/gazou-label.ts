import * as V from "../validation";

export class GazouLabel {
	constructor(
		readonly conductId: number,
		readonly label: string
	){}
}

export function validateGazouLabel(gazouLabel: GazouLabel): string[] {
	let errs: string[] = [];
	V.validate("conductId", gazouLabel.conductId, errs, [
		V.isDefined, V.isInteger, V.isPositive
	]);
	V.validate("ラベル", gazouLabel.label, errs, [
		V.isDefined, V.isString
	]);
	return errs;
}

export function fromJsonToGazouLabel(src: any): [GazouLabel, V.ValidationError] {
	let gazouLabel = new GazouLabel(src.visit_conduct_id, src.label);
	let errs = validateGazouLabel(gazouLabel);
	if( errs.length > 0 ){
		return [undefined, new V.ValidationError(errs)];
	} else {
		return [gazouLabel, null];
	}
}
