import { h, f } from "./typed-dom";
import { DateInput } from "./records-by-date-lib/date-input";
import * as moment from "moment";
import { listVisitsByDate } from "./service";

export class RecordsByDate {
	dom: HTMLElement;
	dateInput: DateInput;

	constructor(){
		this.dateInput = new DateInput();
		this.dom = h.div({}, [
			h.h1({}, ["診察日ごとの診療録リスト"]),
			this.dateInput.dom
		]);
		this.dateInput.setOnSubmit((m: moment.Moment) => {
			this.onDateInputSubmit(m);
		});
	}

	setToday(): void {
		this.dateInput.setToday();
	}

	private async onDateInputSubmit(m: moment.Moment) {
		let at = m.format("YYYY-MM-DD");
		let visits = await listVisitsByDate(at);
		console.log(visits);
	}
}
