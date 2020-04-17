const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

fetch('https://kissanimelist.firebaseio.com/Data2.json?auth='+process.env.FB_Tokken)
.then(res => {
	if(res.status !== 200) {
		throw "response status not 200";
	}
	return res;
})
.then(res => res.json())
.then(json => fs.writeFileSync(path.resolve("firebase.json"),JSON.stringify(json, null, 2)))
.catch(() => {throw "error"});

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});
