import { h, f } from "./typed-dom";
import { DateInput } from "./date-input";
import * as moment from "moment";
import { listVisitsByDate, getFullVisit } from "./service";
import * as kanjidate from "kanjidate";
import { FullVisit } from "./model";

export class RecordsByDate {
	dom: HTMLElement;
	dateInput: DateInput;
	domDispWrapper: HTMLElement;

	constructor(){
		this.dateInput = new DateInput();
		this.dom = h.div({}, [
			h.h1({}, ["診察日ごとの診療録リスト"]),
			this.dateInput.dom,
			f.div(e => this.domDispWrapper = e, {}, [])
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
		let fullVisits = await Promise.all(visits.map(v => {
			return getFullVisit(v.visitId);
		}))
		this.renderDisp(m, fullVisits);
	}

	private renderDisp(m: moment.Moment, fullVisits: FullVisit[]){
		var wrapper = this.domDispWrapper;
		wrapper.innerHTML = "";
		wrapper.appendChild(createHeader(m));
	}
}

function createHeader(m: moment.Moment): HTMLElement {
	return h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);
}
