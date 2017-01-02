"use strict";
const typed_dom_1 = require("./typed-dom");
const records_by_date_1 = require("./records-by-date");
let main = typed_dom_1.h.div({}, []);
document.body.appendChild(main);
function appRecordsByDate(wrapper) {
    let app = new records_by_date_1.RecordsByDate();
    wrapper.appendChild(app.dom);
    app.setToday();
}
appRecordsByDate(main);
/*
class DateInput {
    private nenInput: HTMLInputElement;
    private monthInput: HTMLInputElement;
    private dayInput: HTMLInputElement;

    create(): HTMLElement {
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
                f.a(e => click(e, _ => this.setToday()), {}, ["[本日]"])
            ])
        ]);
    }

    bindSubmit(form: HTMLFormElement) {
        form.addEventListener("submit", (event: Event) => {
            let m = this.get();
            if( ! m ){
                alert("日付の入力が不適切です。");
                return;
            }
            let sqlDate = m.format("YYYY-MM-DD");
            listVisitsByDate(sqlDate)
            .then(function(result){
                console.log(result);
            })
            .catch(function(ex){
                alert(ex);
                return;
            })
        })
    }

    set(m: moment.Moment): void {
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

    get(): moment.Moment | undefined {
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
}

let body = document.body;
let dateInput = new DateInput();
body.appendChild(h.h1({}, ["診察日ごとの診療録リスト"]));
body.appendChild(dateInput.create());

dateInput.setToday();
*/
// import * as service from "./service";
// service.getFullVisit(77970)
// .then(function(result){
// 	console.log(result);
// })
// .catch(function(ex){
// 	console.log("ERROR", ex);
// })
