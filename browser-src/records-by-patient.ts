import { h, f, range, interpose } from "./typed-dom";
import { getPatient, calcVisits, listVisits, getFullVisit } from "./service";
import { Patient, patientBirthdayRep, patientAge, patientSexRep,
	Visit } from "./model";
import * as kanjidate from "kanjidate";
import { RecordContent } from "./record-content";

export class RecordsByPatient {
	dom: HTMLElement;
	private onGotoRecordsByDate: () => void = () => {};

	constructor(private patientId: number){
		this.dom = h.div({}, ["Loading..."]);
		this.setup(patientId);
	}

	setOnGotoRecordsByDate(cb: () => void){
		this.onGotoRecordsByDate = cb;
	}

	private async setup(patientId: number){
		let patient = await getPatient(patientId);
		let totalVisits = await calcVisits(patientId);
		let nav = new RecordNav(patientId, totalVisits);
		nav.setOnChange(visits => {
			this.renderVisits(visitsWrapper, visits);
			nav.updateDoms();
		})
		let dom = this.dom;
		dom.innerHTML = "";
		dom.appendChild(this.topMenu());
		dom.appendChild(h.h2({}, [this.titleLabel(patient)]));
		dom.appendChild(this.patientInfo(patient));
		dom.appendChild(nav.createDom());
		let visitsWrapper = h.div({}, []);
		dom.appendChild(visitsWrapper);
		dom.appendChild(nav.createDom());
		nav.invokeOnChange();
	}

	private topMenu(): HTMLElement {
		let bindGotoByDates = (e: HTMLElement) => {
			e.addEventListener("click", event => {
				this.onGotoRecordsByDate();
			})
		};
		return h.div({}, [
			f.a(bindGotoByDates, {}, ["診察日ごとの診療録へ"])
		])
	}

	private renderVisits(wrapper: HTMLElement, visits: Visit[]){
		let tmpDom = h.div({}, []);
		wrapper.innerHTML = "";
		wrapper.appendChild(tmpDom);
		for(let i=0;i<visits.length;i++){
			let visit = visits[i];
			wrapper.appendChild(new RecordItem(visit).dom);
		}
	}

	private titleLabel(patient: Patient): string {
		return `${ patient.lastName } ${ patient.firstName}（患者番号 ${ patient.patientId }）様の診療記録`;
	}

	private patientInfo(patient: Patient): HTMLElement {
		let birthdayPart: string = patientBirthdayRep(patient);
		if( birthdayPart !== "" ){
			birthdayPart += `(${ patientAge(patient) }才)`
		}
		return h.p({}, [
			`(${ patient.lastNameYomi } ${ patient.firstNameYomi })`,
			" ",
			birthdayPart,
			" ",
			`${ patientSexRep(patient) }性`
		]);
	}
}

class RecordNav {
	private doms: HTMLElement[] = [];
	private currentPage: number = 1;
	private totalPages: number;
	private visitsPerPage: number = 10;
	private onChange: (visits: Visit[]) => void = _ => {};

	constructor(
		private patientId: number,
		totalVisits: number
	){
		this.totalPages = this.calcTotalPages(totalVisits);
	}

	createDom(): HTMLElement {
		let contentDom = this.createConentDom();
		let dom = h.div({}, [this.createConentDom()]);
		this.doms.push(dom);
		return dom;
	}

	private createConentDom(): HTMLElement {
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
			dom.appendChild(this.createConentDom());
		})
	}

	setOnChange(cb: (visits: Visit[]) => void) {
		this.onChange = cb;
	}

	async invokeOnChange() {
		let currentVisits = await this.getCurrentVisits();
		this.onChange(currentVisits);
	}

	private async getCurrentVisits() {
		let offset = (this.currentPage - 1) * this.visitsPerPage;
		return await listVisits(this.patientId, offset, this.visitsPerPage);
	}

	private calcTotalPages(n: number): number {
		return Math.floor((n+this.visitsPerPage-1)/this.visitsPerPage);
	}

	private prevLink(): HTMLElement {
		let a = h.a({}, ["<"]);
		a.addEventListener("click", () => {
			if( this.currentPage > 1 ){
				this.currentPage -= 1;
				this.invokeOnChange();
			}
		})
		return a;
	}

	private nextLink(): HTMLElement {
		let a = h.a({}, [">"]);
		a.addEventListener("click", () => {
			if( this.currentPage < this.totalPages ){
				this.currentPage += 1;
				this.invokeOnChange();
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
			this.invokeOnChange();
		})
		return a;
	}
}

class RecordItem {
	dom: HTMLElement;

	constructor(visit: Visit){
		this.dom = h.div({}, ["Loading..."]);
		getFullVisit(visit.visitId)
		.then(fullVisit => {
			let newDom = h.div({}, [
				h.h3({}, [
					this.formatVisitTime(visit.visitedAt),
				]),
				new RecordContent(fullVisit).dom
			]);
			let parent = this.dom.parentNode;
			if( parent !== null ){
				parent.replaceChild(newDom, this.dom);
			}
		})
	}

	private formatVisitTime(at: string): string {
		return kanjidate.format("{G}{N:2}年{M:2}月{D:2}日（{W}）{h:2}時{m:2}分", at)
	}
}
