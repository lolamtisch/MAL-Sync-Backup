const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const table = require('markdown-table');

async function start() {
	const pageData = convertToPage(await getPaginatedData('/page/export'));
	fs.writeFileSync(path.resolve('page' + ".json"),JSON.stringify(pageData, null, 2));

	const malData = convertToMal(await getPaginatedData('/mal/export'));
	fs.writeFileSync(path.resolve('mal' + ".json"),JSON.stringify(malData, null, 2));

	await updateReadme();
}

function convertToMal(data) {
	const malData = {};
	for (const entry of data) {
		if(!malData[entry.type]) {
			malData[entry.type] = {};
		}
		malData[entry.type][entry.id] = entry;
	}
	return malData;
}

function convertToPage(data) {
	const pageData = {};
	for (const page of data) {
		if(!pageData[page.page]) {
			pageData[page.page] = {};
		}
		pageData[page.page][page.identifier] = page;
	}
	return pageData;
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

let data = {};
async function getPaginatedData(url, type = 'anime', page = 0) {
	return await getData(url + '/' + type + '/' + page).then(async (json) => {
		if(data[url]) {
			data[url] = [].concat(data[url], json.data);
		} else {
			data[url] = json.data;
		}
		if(json.next) {
			return await getPaginatedData(url, type, page + 1);
		} else {
			if(type === 'anime') {
				return await getPaginatedData(url, 'manga')
			} else {
				return data[url];
			}
		}
	}).catch((e) => {throw "pagination error"});
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

start();