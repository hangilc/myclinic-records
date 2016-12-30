import { msg } from './hello'
import * as tmpl from "text!template.html"

export function run(){
	let d = document.createElement("div");
	let t = document.createTextNode(tmpl + "!");
	d.appendChild(t);
	document.getElementById("main").appendChild(d);
}