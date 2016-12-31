import * as $ from 'jquery'
import * as moment from "moment";
import * as kanjidate from "kanjidate"

import Moment = moment.Moment;

let dateInputForm = $("#date-input-form");

function setDate(m: Moment): void{
	let month = m.month() + 1;
	let day = m.date();
	let g = kanjidate.toGengou(m.year(), month, day);
	let form = dateInputForm;
	$("input[name=nen]", form).val(g.nen);
	$("input[name=month]", form).val(month);
	$("input[name=day]", form).val(day);
}

function getDate(): Moment{
	let gengou = "平成";
	let form = dateInputForm;
	let nen = +$("input[name=nen]", form).val();
	let month = +$("input[name=month]", form).val();
	let day = +$("input[name=day]", form).val();
	let year = kanjidate.fromGengou(gengou, nen);
	let m = moment({year: year, month: month - 1, date: day});
	if( m.isValid() ){
		return m;
	} else {
		return undefined;
	}
}

setDate(moment());

$("form#date-input-form .goto-today").click(function(event){
	event.preventDefault();
	setDate(moment());
});

$("form#date-input-form").submit(function(event){
	let m = getDate();
	if( !m ){
		alert("日付の入力が不適切です。");
		return;
	}
	console.log(m.format("YYYY-MM-DD"));
});

import { getKouhi } from "./service";
getKouhi(100).then(function(result){
	console.log(JSON.stringify(result, null, 2));
})
.catch(function(err){
	console.log(err);
})