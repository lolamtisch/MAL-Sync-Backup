const fetch = require('node-fetch');
const fs = require('fs-extra')
const path = require('path');
const table = require('markdown-table');

async function start() {
	fs.removeSync('data');
	await backup('/page/export', 'pages');
	await backup('/mal/export', 'myanimelist');
	await backup('/ani/export', 'anilist');
	await updateReadme();
}


async function backup(url, name, type = 'anime', page = 0, ids = {}) {
	await getData(url + '/' + type + '/' + page).then(async (json) => {
		const promises = json.data.map(data => {
			if(!ids[data.page ?? type]) {
				ids[data.page ?? type] = [];
			}
			ids[data.page ?? type].push(data.identifier ?? data.id);
			return fs.outputFile(`data/${name}/${data.page ?? type}/${data.identifier ?? data.id}.json`, JSON.stringify(data, null, 2))
		})
		await Promise.all(promises);

		if(json.next) {
			return await backup(url, name, type, page + 1, ids);
		} else {
			for(item in ids) {
				await fs.outputFile(`data/${name}/${item}/_index.json`, JSON.stringify(ids[item].sort(), null, 2))
			}
			if(type === 'anime') {
				return await backup(url, name, 'manga')
			}
			return true;
		}
	}).catch((e) => {throw 'backup error'});
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

async function updateReadme() {
	getData('/stats/db').then(json => {
		let stats = [['Page', 'Total', 'MalID', 'noMalID', 'AniID', 'noAniID']];

		for (const pageName in json.pages) {
			const page = json.pages[pageName];
			stats.push([pageName, page.total, page.mal, page.noMal, page.ani, page.noAni])
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

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});

start();