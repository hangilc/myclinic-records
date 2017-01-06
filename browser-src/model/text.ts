import { Value, NumberValue, StringValue, ensureString,
	ensureNumber, ensurePositiveInteger } from "../value";

export class Text {
	public textId: number;
	public visitId: number;
	public content: string;
}

export class TextValues {
	public textId: NumberValue;
	public visitId: NumberValue;
	public content: StringValue;
}

export function fromJsonToText(src: any): Text {
	let text = new Text();
	text.textId = src.text_id;
	text.visitId = src.visit_id;
	text.content = src.content;
	return text;
}

// export function validateText(text: Text,
// 	checkTextId: boolean = true): string[] {
// 	let errs: string[] = [];
// 	if( checkTextId ){
// 		V.validate("textId", text.textId, errs, [
// 			V.isDefined, V.isInteger, V.isPositive
// 		]);
// 	}
// 	V.validate("visitId", text.visitId, errs, [
// 		V.isInteger, V.isPositive
// 	]);
// 	V.validate("content", text.content, errs, [V.isString])
// 	return errs;
// }

// export function fromJsonToText(src: any): Text | V.ValidationError {
// 	let text = new Text(src.text_id, src.visit_id, src.content);
// 	let errs = validateText(text, true);
// 	if( errs.length > 0 ){
// 		return new V.ValidationError(errs);
// 	} else {
// 		return text;
// 	}
// }