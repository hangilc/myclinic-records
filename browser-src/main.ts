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

import { getGazouLabel } from "./service";
getGazouLabel(101).then(function(result){
	console.log(JSON.stringify(result, null, 2));
})
.catch(function(err){
	console.log(err);
})


interface DomCreator {
	create(): Node;
}

class SimpleDomCreator implements DomCreator {
	constructor(readonly tag: string, readonly attrs: any, 
		protected children: DomCreator[]){}

	create(): Node {
		let e = document.createElement(this.tag);
		for(let key in this.attrs){
			let val = this.attrs[key];
			if( key === "style" ){
				if( typeof val === "string" ){
					e.style.cssText = val;
				} else {
					for(let cssKey in val){
						console.log(cssKey, val);
						e.style[cssKey] = val[cssKey];
					}
				}
			} else {
				e.setAttribute(key, val);
			}
		}
		this.children.forEach(function(child){
			e.appendChild(child.create());
		})
		return e;
	}
}

class TextCreator implements DomCreator {
	constructor(readonly text: string){}

	create(): Node {
		return document.createTextNode(this.text);
	}
}

let creator = new SimpleDomCreator("div", 
	{style: {border: "1px solid black", width:"100px", height: "200px"}}, 
	[new TextCreator("Hello, world")]);
document.body.appendChild(creator.create());