import { h, f } from "./typed-dom";
import { SearchPatient } from "./search-patient";

export class RecordsSearchPatient {
	dom: HTMLElement;
	private search: SearchPatient;
	private onGotoRecordsByDate: () => void = () => {};

	constructor(){
		this.search = new SearchPatient();
		this.dom = h.div({}, [
			this.topMenu(),
			h.h1({}, ["患者ごとの診療録リスト"]),
			this.search.dom
		])
	}

	setOnSelect(cb: (patientId: number) => void){
		this.search.setOnSelect(cb);
	}

	setOnGotoRecordsByDate(cb: () => void){
		this.onGotoRecordsByDate = cb;
	}

	topMenu(): HTMLElement {
		let bindClick = (e: HTMLElement) => {
			e.addEventListener("click", event => {
				this.onGotoRecordsByDate();
			})
		}
		return h.div({}, [
			f.a(bindClick, {}, ["診察日ごとの診療録へ"])
		])
	}
}

