import { Value, NumberValue, StringValue, BooleanValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class GazouLabel {
	conductId: number;
	label: string;
}

export function jsonToGazouLabel(src: any): GazouLabel {
	let label = new GazouLabel();
	label.conductId = src.visit_conduct_id;
	label.label = src.label;
	return label;
}

// export function validateGazouLabel(gazouLabel: GazouLabel): string[] {
// 	let errs: string[] = [];
// 	V.validate("conductId", gazouLabel.conductId, errs, [
// 		V.isDefined, V.isInteger, V.isPositive
// 	]);
// 	V.validate("ラベル", gazouLabel.label, errs, [
// 		V.isDefined, V.isString
// 	]);
// 	return errs;
// }

// export function fromJsonToGazouLabel(src: any): GazouLabel | V.ValidationError {
// 	let gazouLabel = new GazouLabel(src.visit_conduct_id, src.label);
// 	let errs = validateGazouLabel(gazouLabel);
// 	if( errs.length > 0 ){
// 		return new V.ValidationError(errs);
// 	} else {
// 		return gazouLabel;
// 	}
// }
