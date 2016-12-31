import * as $ from "jquery";
import { ValidationError } from "./validation";
import * as model from "./model";

import Patient = model.Patient;
import Visit = model.Visit;

export class HttpError {
	constructor(
		readonly status: string,
		readonly text: string,
		readonly exception: string
	){}
}

interface fromJson<T> {
	(json: any) : [T, ValidationError]
}

function fromJsonArray<T>(cvtor: fromJson<T>): fromJson<T[]> {
	return function(json: any) : [T[], ValidationError] {
		if( Array.isArray(json) ){
			let list: any[] = <any[]>json;
			let ret: T[] = [];
			for(let i=0;i<list.length;i++){
				let item = list[i];
				let [v, e] : [T, ValidationError] = cvtor(item);
				if( e ){
					return [undefined, e];
				}
				ret.push(v);
			}
			return [ret, undefined];
		} else {
			return [undefined, new ValidationError(["array expected"])];
		}
	}
}

function request<T>(service: string, data: Object, 
	method: string, cvtor: fromJson<T>){
	return new Promise<T>(function(resolve, reject){
		$.ajax({
			url: '/service',
			type: method,
			data: Object.assign({
				_q: service
			}, data),
			dataType: "json",
			timeout: 15000,
			success: function(result){
				let [ret, err]: [T, ValidationError] = cvtor(result);
				if( err ){
					reject(err);
				} else {
					resolve(ret);
				}
			},
			error: function(xhr, status, ex){
				reject(new HttpError(status, xhr.responseText, ex));
			}
		})
	});
}

export function getPatient(patientId: number): Promise<Patient> {
	if( !(Number.isInteger(patientId) && patientId > 0) ){
		return Promise.reject("invalid patient_id");
	}
	return request<Patient>("get_patient", { patient_id: patientId }, 
		"GET", model.fromJsonToPatient);
}

export function listVisitsByDate(at: string): Promise<Visit[]> {
	if( !(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(at)) ){
		return Promise.reject("invalid at");
	}
	return request<Visit[]>("list_visits_by_date", { at: at }, "GET",
		fromJsonArray(model.fromJsonToVisit));
}

