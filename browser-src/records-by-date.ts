import { h, f } from "./typed-dom";
import { DateInput } from "./date-input";
import * as moment from "moment";
import { listVisitsByDate, getFullVisit, getPatient } from "./service";
import * as kanjidate from "kanjidate";
import { FullVisit, Patient, Text, FullDrug, FullShinryou,
	FullConduct, Charge } from "./model";
import { drugRep } from "./myclinic-util";

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

	set(m: moment.Moment): void {
		this.dateInput.set(m);
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
		fullVisits.forEach(v => {
			this.renderVisit(v, wrapper);
		})
	}

	private async renderVisit(visit: FullVisit, wrapper: HTMLElement){
		let patient = await getPatient(visit.patientId);
		let rec = new RecordItem(visit, patient);
		wrapper.appendChild(rec.dom);
	}
}

function createHeader(m: moment.Moment): HTMLElement {
	return h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);
}

function formatVisitTime(at: string): string {
	return kanjidate.format("{h:2}時{m:2}分", at)
}

class RecordItem {
	dom: HTMLElement;

	constructor(visit: FullVisit, patient: Patient) {
		let content = new RecordContent(visit);
		this.dom = h.div({}, [
			h.h3({}, [
				`${ patient.lastName } ${ patient.firstName }`,
				" ",
				`(患者番号 ${ patient.patientId })`,
				"[",
				f.a(e => {}, {}, ["全診療記録"]),
				"]",
				" ",
				formatVisitTime(visit.visitedAt),
			]),
			content.dom
		]);
	}
}

class RecordContent {
	dom: HTMLElement;

	constructor(visit: FullVisit){
		let left = {
			style: "background-color: rgb(255, 255, 153)",
			valign: "top",
			width: "260",
			class: "texts-list"
		};
		let right = {
			style: "background-color: rgb(255, 204, 255)",
			valign: "top",
			width: "260"
		}
		this.dom = h.table({style:"margin-left:10px", 
			border:"0", cellpadding:"0", cellspacing:"0"}, [
				h.tbody({}, [
					h.tr({}, [
						h.td(left, [
							new RecordTextList(visit.texts).dom
						]),
						h.td(right, [
							new RecordDrugList(visit.drugs).dom
						])
					])
				])
		]);
	}
}

class RecordTextList {
	dom: HTMLElement;

	constructor(texts: Text[]){
		this.dom = h.div({}, texts.map(t => {
			let rt = new RecordText(t);
			return rt.dom;
		}))
	}
}

class RecordText {
	dom: HTMLElement;

	constructor(text: Text){
		let content = text.content;
		let lines = content.split(/\r\n|\r|\n/g);
		let attr = {
			style: "font-family:sans-serif; font-size:14px; margin:10px;"
		};
		this.dom = h.p(attr, []);
		lines.forEach(line => {
			let t = document.createTextNode(line);
			this.dom.appendChild(t);
			this.dom.appendChild(h.br({}, []));
		})
	}
}

class RecordDrugList {
	dom: HTMLElement;

	constructor(drugs: FullDrug[]){
		let index = 1;
		this.dom = h.div({class: "drugs-list"}, drugs.map(d => {
			let item = new RecordDrug(index++, d);
			return item.dom;
		}))
	}
}

class RecordDrug {
	dom: HTMLElement;

	constructor(index: number, drug: FullDrug){
		this.dom = h.div({}, [
			index.toString(),
			") ",
			drugRep(drug)
		])
	}
}