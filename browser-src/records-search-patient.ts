import { h, f } from "./typed-dom";
import { searchPatient } from "./service";

export class RecordsSearchPatient {
	dom: HTMLElement;

	constructor(){
		this.dom = h.div({}, [
			h.h1({}, ["患者ごとの診療録リスト"]),
			new SearchPatient().dom
		])
	}
}

class SearchPatient {
	dom: HTMLElement;
	private select: HTMLSelectElement;

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
		])
	}

	private async doSearch(text: string){
		let patients = await searchPatient(text);
		console.log(patients);
	}
}