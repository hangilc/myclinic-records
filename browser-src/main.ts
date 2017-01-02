import * as $ from "jquery";
import { h, f } from "./typed-dom";
import { RecordsByDate } from "./records-by-date";

let main: HTMLElement = h.div({}, []);
document.body.appendChild(main);

function appRecordsByDate(wrapper: HTMLElement): void{
	let app = new RecordsByDate();
	wrapper.appendChild(app.dom);
	app.setToday();
}

appRecordsByDate(main);
