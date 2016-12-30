import * as path from "path"
import * as express from "express"

export const staticDir: string = path.join(__dirname, "static");

export interface Config {

}

export function initApp(app: express.IRouter<string>, config: Config){
	app.get("/config", function(req: express.Request, res: express.Response){
		res.set({
			"Content-Type": "text/javascript"
		})
		res.send("var config = " + JSON.stringify(config) + ";")
	})
}