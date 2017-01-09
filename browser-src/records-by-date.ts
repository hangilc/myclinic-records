import { h, f, range, interpose } from "./typed-dom";
import { DateInput } from "./date-input";
import * as moment from "moment";
import { listVisitsByDate, getFullVisit, getPatient } from "./service";
import * as kanjidate from "kanjidate";
import { Visit, FullVisit, Patient } from "./model";
import { RecordContent } from "./record-content";

export class RecordsByDate {
	dom: HTMLElement;
	private dateInput: DateInput;
	private domDispWrapper: HTMLElement;
	private onGotoPatientRecords: (patientId: number) => void = _ => {};
	private onGotoSearchRecords: () => void = () => {};

	constructor(){
		this.dateInput = new DateInput();
		this.dom = h.div({}, [
			this.topMenu(),
			h.h1({}, ["診察日ごとの診療録リスト"]),
			this.dateInput.dom,
			f.div(e => this.domDispWrapper = e, {}, [])
		]);
		this.dateInput.setOnSubmit((m: moment.Moment) => {
			this.onDateInputSubmit(m);
		});
	}

	setOnGotoPatientRecords(cb: (patientId: number) => void): void {
		this.onGotoPatientRecords = cb;
	}

	setOnSearchRecords(cb: () => void): void {
		this.onGotoSearchRecords = cb;
	}

	setToday(): void {
		this.dateInput.setToday();
	}

	set(m: moment.Moment): void {
		this.dateInput.set(m);
	}

	private topMenu(): HTMLElement {
		let bind = (a: HTMLElement): void => {
			a.addEventListener("click", () => {
				this.onGotoSearchRecords();
			})
		}
		return h.div({}, [
			f.a(bind, {}, ["患者ごとの診療記録へ"])
		])

	}

	private async onDateInputSubmit(m: moment.Moment) {
		let at = m.format("YYYY-MM-DD");
		try {
			let visits = await listVisitsByDate(at);
			this.renderDisp(m, visits);
		} catch(ex){
			alert(ex);
		}
	}

	private renderDisp(m: moment.Moment, visits: Visit[]) {
		var wrapper = this.domDispWrapper;
		var nav = new RecordNav(visits);
		nav.setOnChange(() => {
			let curVisits = nav.getCurrentVisits();
			this.renderVisits(vWrapper, curVisits);
			nav.updateDoms();
		});
		wrapper.innerHTML = "";
		wrapper.appendChild(this.createHeader(m));
		wrapper.appendChild(nav.createDom());
		let vWrapper = h.div({}, []);
		wrapper.appendChild(vWrapper);
		this.renderVisits(vWrapper, nav.getCurrentVisits());
		wrapper.appendChild(nav.createDom());
	}

	private renderVisits(wrapper: HTMLElement, visits: Visit[]){
		let tmpDom = h.div({}, []);
		let cb = (patientId: number) => this.onGotoPatientRecords(patientId);
		wrapper.innerHTML = "";
		wrapper.appendChild(tmpDom);
		for(let i=0;i<visits.length;i++){
			let visit = visits[i];
			wrapper.appendChild(new RecordItem(visit, cb).dom);
		}
	}

	private createHeader(m: moment.Moment): HTMLElement {
		return h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);

	}
}

class RecordNav {
	private doms: HTMLElement[] = [];
	private currentPage: number;
	private totalPages: number;
	private visitsPerPage: number = 10;
	private onChange: () => void = () => {};

	constructor(
		private visits: Visit[]
	){
		this.totalPages = this.calcTotalPages(visits.length);
		this.currentPage = 1;
	}

	createDom(): HTMLElement {
		let dom = h.div({}, [this.createContentDom()]);
		this.doms.push(dom);
		return dom;
	}

	private createContentDom(): HTMLElement {
		return h.div({style: "margin: 10px 0"}, [
			this.prevLink(),
			" ",
			...this.pageLinks(),
			" ",
			this.nextLink()
		]);
	}

	updateDoms(): void {
		this.doms.forEach(dom => {
			dom.innerHTML = "";
			dom.appendChild(this.createContentDom());
		})
	}

	setOnChange(cb: () => void) {
		this.onChange = cb;
	}

	getCurrentVisits(): Visit[] {
		let offset = (this.currentPage - 1) * this.visitsPerPage;
		return this.visits.slice(offset, offset + this.visitsPerPage);
	}

	private calcTotalPages(n: number): number {
		return Math.floor((n+this.visitsPerPage-1)/this.visitsPerPage);
	}

	private prevLink(): HTMLElement {
		let a = h.a({}, ["<"]);
		a.addEventListener("click", () => {
			if( this.currentPage > 1 ){
				this.currentPage -= 1;
				this.onChange();
			}
		})
		return a;
	}

	private nextLink(): HTMLElement {
		let a = h.a({}, [">"]);
		a.addEventListener("click", () => {
			if( this.currentPage < this.totalPages ){
				this.currentPage += 1;
				this.onChange();
			}
		})
		return a;
	}

	private pageLinks(): (HTMLElement | string)[] {
		let links =  range(1, this.totalPages).map(i => {
			return this.createPageLink(i);
		});
		return interpose(" | ", links);
	}

	private createPageLink(i: number): HTMLElement {
		let attr: any = {style: {}};
		if( i === this.currentPage ){
			attr.style.color = "red";
		}
		let a = h.a(attr, [i.toString()]);
		a.addEventListener("click", () => {
			this.currentPage = i;
			this.onChange();
		})
		return a;
	}
}

class RecordItem {
	dom: HTMLElement;

	constructor(visit: Visit, cb: (patientId: number) => void){
		this.dom = h.div({}, ["Loading..."]);
		Promise.all([getFullVisit(visit.visitId), getPatient(visit.patientId)])
		.then(values => {
			let [fullVisit, patient] = values;
			let newDom = h.div({}, [
				h.h3({}, [
					`${ patient.lastName } ${ patient.firstName }`,
					" ",
					`(患者番号 ${ patient.patientId })`,
					"[",
					f.a(e => bindGotoPatientRecords(e), {}, ["全診療記録"]),
					"]",
					" ",
					this.formatVisitTime(visit.visitedAt),
				]),
				new RecordContent(fullVisit).dom
			]);
			let parent = this.dom.parentNode;
			if( parent !== null ){
				parent.replaceChild(newDom, this.dom);
			}
		})

		function bindGotoPatientRecords(a: HTMLElement): void {
			a.addEventListener("click", () => {
				cb(visit.patientId);
			})
		}
	}

	private formatVisitTime(at: string): string {
		return kanjidate.format("{h:2}時{m:2}分", at)
	}
}
