const figlet = require('figlet');
const chalk = require('chalk');

const colorize = (msq, color) => {
	if (typeof color !== "undefined") {
		msq = chalk[color].bold(msq);
	}
	return msq;
};

const log = (msq, color) => {
	console.log(colorize(msq, color));
};

const biglog = (msq, color) => {
	log(figlet.textSync(msq, { horizontalLayout: 'full' }), color);
};

const errorlog = (emsq) => {
	console.log(`${colorize("Error", "red")}: ${colorize(colorize(emsq, "red"), "bgYellowBright")}`);
};

exports = module.exports = {
	colorize,
	log,
	biglog,
	errorlog
};