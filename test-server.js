var web = require("myclinic-web");
var subapp = require("./index.js");

var sub = {
	name: "records",
	module: subapp,
	configKey: "records"
};

web.cmd.runFromCommand([sub], {port: 9004});
