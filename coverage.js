const puppeteer = require("puppeteer");
const util = require('util');
const fs = require("fs");
const urls = [
  'http://steam.test',
  'http://steam.test/contact-us/',
  'http://steam.test/blog/',
  'http://steam.test/404',
  'http://steam.test/?s=test',
];

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

(async () => {

	const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true, args: ['--window-size=1920,1080'] });
	const page = await browser.newPage();
	await page.coverage.startCSSCoverage({ resetOnNavigation: false });

	for (let i = 0; i < urls.length; i++) {
		const url = urls[i];
		try {
			await page.setViewport({
				width: 575,
				height: 600,
				deviceScaleFactor: 2,
			});
			await page.goto(url);
			await page.click( '.svg-trigger' );
			await page.waitFor(1000);
			await page.click( '.sub-menu-trigger' );
			await page.waitFor(2000);
			
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
			await autoScroll(page);
			await page.waitFor(3000);
		}
	catch (err) {}
	}
  
	cssCoverage = await page.coverage.stopCSSCoverage();

	await browser.close();

	fs.writeFile("./exported_css.json", JSON.stringify(cssCoverage, null, 2), function(err) {
		if(err) {
			return console.log(err);
		}
	console.log("The file was saved!");
	});   
  
})();
