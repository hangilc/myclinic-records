import { Text, Charge, FullShinryou, FullDrug, FullConductShinryou,
	FullConductDrug, FullConductKizai, FullConduct, 
	FullVisit, hokenRep,  } from "./model";
import { h, f } from "./typed-dom";
import { drugRep, conductKindToKanji } from "./myclinic-util";

export class RecordContent {
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
					]),
					h.tr({}, [
						h.td({colspan:2, style: "font-family:sans-serif; font-size:14px; padding:10px; background-color:#eee"}, [
							this.chargeAndHokenRep(visit)
						])
					])
				])
		]);
	}

	chargeAndHokenRep(visit: FullVisit): string {
		let charge = this.chargeRep(visit.charge);
		let hoken = hokenRep(visit);
		return charge + ` ${ hoken }`;
	}

	chargeRep(charge: Charge | null): string {
		if( charge === null ){
			return "未請求";
		} else {
			return `請求額： ${ charge.charge.toLocaleString() }円`;
		}
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