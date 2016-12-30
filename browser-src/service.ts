import * as $ from "jquery";

export class Patient {
	constructor(readonly lastName: string, readonly firstName: string,
		readonly lastNameYomi: string, readonly firstNameYomi: string){

	}

}

export function getPatient_(patientId: number) : Patient {
	return new Patient("lastName", "firstName", "lastNameYomi", "firstNameYomi")
}

