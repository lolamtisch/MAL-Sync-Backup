const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const table = require('markdown-table');

download('/mal/export', 'mal').then( () => download('/page/export', 'page').then( () => updateReadme()));

async function download(url, filename) {
	getData(url).then(json => fs.writeFileSync(path.resolve(filename + ".json"),JSON.stringify(json, null, 2)))
	.catch(() => {throw "error"});
}

async function updateReadme() {
	getData('/stats/db').then(json => {
		let stats = [['Page', 'Total', 'Malids', 'Empty']];

		for (const pageName in json.pages) {
			const page = json.pages[pageName];
			stats.push([pageName, page.total, page.mal, page.noMal])
		}

		const statstable = table(stats);
		const descFile = path.resolve('./README.md');

		fs.readFile(descFile, 'utf8', function(err, data) {
			if (err) {
			  throw err;
			}
			const result = data.replace(/<!--statstable-->((.|\n|\r)*)<!--\/statstable-->/g, `<!--statstable-->\n${statstable}\n<!--/statstable-->`);

			fs.writeFile(descFile, result, 'utf8', function(err) {
			  if (err) throw err;
			});
		});
	});
}

async function getData(url) {
	return fetch(process.env.DOMAIN + url, {
		headers: {
			'x-access-token': process.env.ACCESS_TOKEN
		}
	}).then(res => {
		if(res.status !== 200) {
			throw "response status not 200";
		}
		return res.json()
	})
}

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});