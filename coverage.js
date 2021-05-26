const puppeteer = require('puppeteer');
const util = require('util');
const fs = require("fs");

const urls = ['http://steam.test/index.html','http://steam.test/index2.html'];

// the configs you want to test
const configs = [
  {url: 'http://steam.test/index.html'},
  {url: 'http://steam.test/index2.html',},
];

(async () => {

const coverage = async ({ url }) => {

	let browser = await puppeteer.launch();
	let page = await browser.newPage();

	await page.coverage.startCSSCoverage({ resetOnNavigation: false });
	await page.goto(url);
	await page.reload();
	
	let cssCoverage = await page.coverage.stopCSSCoverage();

	await browser.close();
	
	return cssCoverage;

};

const results = [];

for(const config of configs) {
	const result = await coverage(config);
	results.push(result);
}

//console.log( JSON.stringify(results, null, 2) );

fs.writeFile("./exported_css.json", JSON.stringify(results, null, 2), function(err) {
	if(err) {
		return console.log(err);
	}
	console.log("The file was saved!");
}); 

})()
