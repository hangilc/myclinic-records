import { h, f } from "./typed-dom";
import * as moment from "moment";
import * as kanjidate from "kanjidate";

import Moment = moment.Moment;

export class DateInput {
	dom: HTMLElement;
	private nenInput: HTMLInputElement;
	private monthInput: HTMLInputElement;
	private dayInput: HTMLInputElement;
	onSubmit: (m: Moment) => any | undefined;

	constructor(){
		this.dom = this.createDom();
	}

	setOnSubmit(fn: (m: Moment) => any): void {
		this.onSubmit = fn;
	}

	set(m: Moment): void {
		let month = m.month() + 1;
		let day = m.date();
		let g = kanjidate.toGengou(m.year(), month, day);
		this.nenInput.value = g.nen.toString();
		this.monthInput.value = month.toString();
		this.dayInput.value = day.toString();
	}

	setToday(): void {
		this.set(moment());
	}

	get(): Moment | undefined {
		let gengou = "平成";
		let nen: number = +this.nenInput.value;
		let month: number = +this.monthInput.value;
		let day:number = +this.dayInput.value;
		let year:number = kanjidate.fromGengou(gengou, nen);
		let m = moment({year: year, month: month - 1, date: day});
		if( m.isValid() ){
			return m;
		} else {
			return undefined;
		}
	}

	private createDom(): HTMLElement {
		return h.div({}, [
			f.form(e => this.bindSubmit(e), {}, [
				"平成",
				f.input(e => this.nenInput = e, {size:"4", class:"num-input"}),
				"年 ",
				f.input(e => this.monthInput = e, {size:"4", class:"num-input"}),
				"月 ",
				f.input(e => this.dayInput = e, {size:"4", class:"num-input"}),
				"日 ",
				h.input({type:"submit", value:"選択"}),
				" ",
				f.a(e => this.bindToday(e), {}, ["[本日]"])
			])
		]);
	}

	private bindSubmit(form: HTMLFormElement) {
		form.addEventListener("submit", (event: Event) => {
			if( this.onSubmit ){
				let m = this.get();
				if( ! m ){
					alert("日付の入力が不適切です。");
					return;
				}
				this.onSubmit(m);
			}
		})
	}

	private bindToday(e: HTMLElement){
		e.addEventListener("click", _ => {
			this.setToday();
		});
	}

}

