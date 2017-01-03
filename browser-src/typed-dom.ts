export function createElement<T extends HTMLElement>(tag: string, attrs: any, 
		children?: (HTMLElement|string)[]): T {
	let e: T = <T>document.createElement(tag);
	for(let key in attrs){
		let val = attrs[key];
		if( key === "style" ){
			if( typeof val === "string" ){
				e.style.cssText = val;
			} else {
				for(let cssKey in val){
					e.style[cssKey] = val[cssKey];
				}
			}
		} else {
			e.setAttribute(key, val);
		}
	}
	if( children ){
		children.forEach(function(n){
			if( typeof n === "string" ){
				e.appendChild(document.createTextNode(<string>n));
			} else {
				e.appendChild(<Node>n);
			}
		});
	}
	return e;
}

export function createElementFn<T extends HTMLElement>(fn: (e:T) => void, 
		tag: string, attrs: any, children?: (HTMLElement|string)[]): T {
	let e = createElement<T>(tag, attrs, children);
	fn(e);
	return e;
}

export namespace h {
	function makeCreator<T extends HTMLElement>(tag: string): (attrs: any, 
		children?: (HTMLElement|string)[]) => T {
		return function(attrs: any, children?: (HTMLElement|string)[]): T{
			return createElement<T>(tag, attrs, children);
		}
	}

	export let div = makeCreator<HTMLElement>("div");
	export let h1 = makeCreator<HTMLElement>("h1");
	export let h2 = makeCreator<HTMLElement>("h2");
	export let h3 = makeCreator<HTMLElement>("h3");
	export let input = makeCreator<HTMLInputElement>("input");
	export let button = makeCreator<HTMLElement>("button");

	export function form(attrs: any, children?: (HTMLElement|string)[]): HTMLFormElement{
		if( !("onSubmit" in attrs) ){
			attrs.onSubmit = "return false";
		}
		return createElement<HTMLFormElement>("form", attrs, children);
	}

	export function a(attrs: any, children?: (HTMLElement|string)[]): HTMLElement{
		if( !("href" in attrs) ){
			attrs.href = "javascript:void(0)"
		}
		return createElement<HTMLElement>("a", attrs, children);
	}
}

export namespace f {
	function makeCreator<T extends HTMLElement>(tag: string): 
		(fn: (e:T) => void, attrs: any, children?: (HTMLElement|string)[]) => T {
		return function(fn: (e:T) => void,
				attrs: any, children?: (HTMLElement|string)[]): T{
			return createElementFn<T>(fn, tag, attrs, children);
		}
	}

	export let div = makeCreator<HTMLElement>("div");
	export let h1 = makeCreator<HTMLElement>("h1");
	export let h2 = makeCreator<HTMLElement>("h2");
	export let h3 = makeCreator<HTMLElement>("h3");
	export let input = makeCreator<HTMLInputElement>("input");
	export let button = makeCreator<HTMLElement>("button");

	export function form(fn: (e:HTMLFormElement) => void,
			attrs: any, children?: (HTMLElement|string)[]): HTMLFormElement{
		if( !("onSubmit" in attrs) ){
			attrs.onSubmit = "return false";
		}
		return createElementFn<HTMLFormElement>(fn, "form", attrs, children);
	}

	export function a(fn: (e:HTMLElement) => void,
			attrs: any, children?: (HTMLElement|string)[]): HTMLElement{
		if( !("href" in attrs) ){
			attrs.href = "javascript:void(0)"
		}
		return createElementFn<HTMLElement>(fn, "a", attrs, children);
	}
}

export function click(e: HTMLElement, handler: (event: MouseEvent) => void): void {
	e.addEventListener("click", handler);
}

export function submit(e: HTMLFormElement, handler: (event: Event) => void): void {
	e.addEventListener("submit", handler);
}