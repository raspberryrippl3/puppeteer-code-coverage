const puppeteer = require('puppeteer');
const util = require('util');
const fs = require("fs");

// the configs you want to test
const configs = [
  {url: 'http://steam.test/index.html'},
  {url: 'http://steam.test/index2.html',},
];

(async () => {

const coverage = async ({ url }) => {

	let browser = await puppeteer.launch({
		headless: false,
	});
	let page = await browser.newPage();

	await page.coverage.startCSSCoverage({ resetOnNavigation: false });

	await page.setViewport({
	  width: 575,
	  height: 600,
	  deviceScaleFactor: 2,
	});

	await page.goto(url);
	//await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitFor(3000);
	//await page.waitForNavigation({ waitUntil: 'networkidle0' });
	
	await page.setViewport({
	  width: 767,
	  height: 600,
	  deviceScaleFactor: 2,
	});
	await page.reload();
	
	await page.waitFor(3000);
	
	await page.setViewport({
	  width: 991,
	  height: 600,
	  deviceScaleFactor: 2,
	});
	await page.reload();
	
	await page.waitFor(3000);
	
	await page.setViewport({
	  width: 1199,
	  height: 800,
	  deviceScaleFactor: 1,
	});
	await page.reload();
	
	await page.waitFor(3000);
	
	await page.setViewport({
	  width: 1399,
	  height: 1024,
	  deviceScaleFactor: 1,
	});
	await page.reload();
	
	await page.waitFor(3000);

	await page.setViewport({
	  width: 1920,
	  height: 1080,
	  deviceScaleFactor: 1,
	});
	await page.reload();
	
	await page.waitFor(3000);
	
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
