import { h } from "./typed-dom";
import { RecordsByDate } from "./records-by-date";
import { RecordsByPatient } from "./records-by-patient";
import { RecordsSearchPatient } from "./records-search-patient";
import * as moment from "moment";

let main: HTMLElement = h.div({}, []);
document.body.appendChild(main);

function appRecordsByDate(wrapper: HTMLElement): void{ 
	let app = new RecordsByDate();
	app.setOnGotoPatientRecords(patientId => {
		appPatientRecords(wrapper, patientId);
	});
	app.setOnSearchRecords(() => {
		appSearchRecords(wrapper);
	})
	wrapper.innerHTML = "";
	let tmpDom = h.div({}, [app.dom]);
	wrapper.appendChild(tmpDom);
	app.set(moment("2016-08-29"));
	//app.setToday();
}

function appPatientRecords(wrapper: HTMLElement, patientId: number): void {
	let app = new RecordsByPatient(patientId);
	wrapper.innerHTML = "";
	let tmpDom = h.div({}, [app.dom]);
	wrapper.appendChild(tmpDom);
}

function appSearchRecords(wrapper: HTMLElement): void {
	let app = new RecordsSearchPatient();
	wrapper.innerHTML = "";
	let tmpDom = h.div({}, [app.dom]);
	wrapper.appendChild(tmpDom);
}

appRecordsByDate(main);

