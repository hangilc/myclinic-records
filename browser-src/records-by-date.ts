import { h, f, range, interpose } from "./typed-dom";
import { DateInput } from "./date-input";
import * as moment from "moment";
import { listVisitsByDate, getFullVisit, getPatient } from "./service";
import * as kanjidate from "kanjidate";
import { Visit, FullVisit, Patient, Text, FullDrug, FullShinryou,
	FullConduct, FullConductShinryou, FullConductDrug,
	FullConductKizai, Charge } from "./model";
import { drugRep, conductKindToKanji } from "./myclinic-util";

export class RecordsByDate {
	dom: HTMLElement;
	private dateInput: DateInput;
	private domDispWrapper: HTMLElement;

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
		try {
			let visits = await listVisitsByDate(at);
			this.renderDisp(m, visits);
		} catch(ex){
			alert(ex);
			return;
		}
	}

	private async renderDisp(m: moment.Moment, visits: Visit[]) {
		var wrapper = this.domDispWrapper;
		var nav = new RecordNav(visits);
		nav.setOnChange(() => {
			let curVisits = nav.getCurrentVisits();
			this.renderVisits(vWrapper, curVisits);
			nav.updateDoms();
		});
		wrapper.innerHTML = "";
		wrapper.appendChild(createHeader(m));
		wrapper.appendChild(nav.createDom());
		let vWrapper = h.div({}, []);
		wrapper.appendChild(vWrapper);
		this.renderVisits(vWrapper, nav.getCurrentVisits());
		wrapper.appendChild(nav.createDom());
	}

	private async renderVisits(wrapper: HTMLElement, visits: Visit[]){
		let tmpDom = h.div({}, []);
		wrapper.innerHTML = "";
		wrapper.appendChild(tmpDom);
		for(let i=0;i<visits.length;i++){
			let visit = visits[i];
			wrapper.appendChild(new RecordItem(visit).dom);
		}
	}
}

function createHeader(m: moment.Moment): HTMLElement {
	return h.h2({}, [kanjidate.format(kanjidate.f1, m.format("YYYY-MM-DD"))]);
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
		let dom = h.div({style: "margin: 10px 0"}, [
			this.prevLink(),
			" ",
			...this.pageLinks(),
			" ",
			this.nextLink()
		]);
		this.doms.push(dom);
		return dom;
	}

	updateDoms(): void {
		this.doms.forEach(dom => {
			let newDom = this.createDom();
			let parent = dom.parentNode;
			if( parent !== null ){
				parent.replaceChild(newDom, dom);
			}
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

	constructor(visit: Visit){
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
					f.a(e => {}, {}, ["全診療記録"]),
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
	}

	private formatVisitTime(at: string): string {
		return kanjidate.format("{h:2}時{m:2}分", at)
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
							new RecordShinryouList(visit.shinryouList).dom,
							new RecordDrugList(visit.drugs).dom,
							new RecordConductList(visit.conducts).dom,
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

class RecordShinryouList {
	dom: HTMLElement;

	constructor(shinryouList: FullShinryou[]){
		this.dom = h.div({class: "shinryou-list"}, shinryouList.map(s => {
			return new RecordShinryou(s).dom;
		}))
	}
}

class RecordShinryou {
	dom: HTMLElement;

	constructor(shinryou: FullShinryou){
		this.dom = h.div({}, [
			shinryou.name,
			" ",
			`[${ shinryou.tensuu }点]`
		])
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
			drugRep(drug),
			` [薬価 ${ drug.yakka }円]`
		])
	}
}

class RecordConductList {
	dom: HTMLElement;

	constructor(conducts: FullConduct[]){
		this.dom = h.div({class: "conducts-list"}, conducts.map(c => {
			return new RecordConduct(c).dom;
		}))
	}
}

class RecordConduct {
	dom:HTMLElement;

	constructor(conduct: FullConduct){
		let label: string = "";
		if( conduct.gazouLabel !== null ){
			label = conduct.gazouLabel;
		}
		this.dom = h.div({}, [
			h.div({}, [`[${ conductKindToKanji(conduct.kind) }]`]),
			...(label === "" ? [] : [label]),
			...conduct.shinryouList.map(s => this.renderShinryou(s)),
			...conduct.drugs.map(d => this.renderDrug(d)),
			...conduct.kizaiList.map(k => this.renderKizai(k))
		])
	}

	renderShinryou(shinryou: FullConductShinryou): HTMLElement {
		return h.div({}, [shinryou.name])
	}

	renderDrug(drug: FullConductDrug): HTMLElement {
		return h.div({}, [`${ drug.name } ${ drug.amount }${drug.unit}`]);
	}

	renderKizai(kizai: FullConductKizai): HTMLElement {
		return h.div({}, [`${ kizai.name } ${ kizai.amount }${kizai.unit}`]);
	}
}