import { h, f } from "./typed-dom";
import { searchPatient } from "./service";

export class RecordsSearchPatient {
	dom: HTMLElement;
	private search: SearchPatient;

	constructor(){
		this.search = new SearchPatient();
		this.dom = h.div({}, [
			h.h1({}, ["患者ごとの診療録リスト"]),
			this.search.dom
		])
	}

	setOnSelect(cb: (patientId: number) => void){
		this.search.setOnSelect(cb);
	}
}

class SearchPatient {
	dom: HTMLElement;
	private select: HTMLSelectElement;
	private onSelect: (patientId: number) => void = _ => {};

	constructor(){
		let textInput: HTMLInputElement;
		let bindSubmit = (e: HTMLElement) => {
			e.addEventListener("submit", event => {
				let text = textInput.value;
				this.doSearch(text);
			})
		};
		this.dom = h.div({}, [
			f.form(bindSubmit, {}, [
				f.input(e => textInput = e, {}, []), " ",
				h.input({type: "submit", value: "検索"}, []),
				h.div({}, [
					f.select(e => this.select = e, {size: "12", style: "width:360px; display:none"}, [])
				])
			])
		]);
		this.select.addEventListener("dblclick", event => {
			let target = event.target;
			if( target instanceof HTMLOptionElement ){
				let value = +target.value;
				if( value > 0 ){
					this.onSelect(value);
				}
			}
		})
	}

	setOnSelect(cb: (patientId: number) => void){
		this.onSelect = cb;
	}

	private async doSearch(text: string){
		let patients = await searchPatient(text);
		let select = this.select;
		select.innerHTML = "";
		patients.forEach(patient => {
			let label = `${ patient.lastName } ${ patient.firstName }`;
			let opt = h.option({value: patient.patientId}, [label]);
			select.appendChild(opt);
		})
		select.style.display = "";
	}
}