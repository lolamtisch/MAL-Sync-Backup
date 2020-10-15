const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

download('/mal/export', 'mal').then( () => download('/page/export', 'page'))

async function download(url, filename) {
	fetch(process.env.DOMAIN + url, {
		headers: {
			'x-access-token': process.env.ACCESS_TOKEN
		}
	}).then(res => {
		if(res.status !== 200) {
			throw "response status not 200";
		}
		return res;
	})
	.then(res => res.json())
	.then(json => fs.writeFileSync(path.resolve(filename + ".json"),JSON.stringify(json, null, 2)))
	.catch(() => {throw "error"});
}

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});
