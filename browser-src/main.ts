import * as $ from "jquery";
import { h, f } from "./typed-dom";
import { RecordsByDate } from "./records-by-date";
import * as moment from "moment";

let main: HTMLElement = h.div({}, []);
document.body.appendChild(main);

function appRecordsByDate(wrapper: HTMLElement): void{
	let app = new RecordsByDate();
	wrapper.appendChild(app.dom);
	//app.setToday();
	app.set(moment("2016-08-29"))
}

appRecordsByDate(main);

