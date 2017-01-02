import { h, f } from "./typed-dom";
import { DateInput } from "./records-by-date-lib/date-input";

export class RecordsByDate {
	dom: HTMLElement | undefined;
	dateInput: DateInput | undefined;

	createDom(): HTMLElement {
		this.dateInput = new DateInput();
		this.dom = h.div({}, [
			h.h1({}, ["診察日ごとの診療録リスト"]),
			this.dateInput.createDom()
		]);
		return this.dom;
	}

	setToday(): void {
		let d = this.dateInput;
		if( d ){
			d.setToday();
		}
	}
}