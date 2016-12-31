import * as $ from "jquery";
import { ValidationError } from "./validation";
import * as model from "./model";

import Patient = model.Patient;

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
	return request<Patient>("get_patient", { patient_id: patientId }, 
		"GET", model.fromJsonToPatient);
}

