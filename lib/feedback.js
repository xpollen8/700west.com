const Db = require('mywrap');

let db;

const cleanValue = (v) => v.replace(/&#34;/g, "'").replace(/&#39;/g, "'").replace(/&#41;/g, ")").replace(/&#36;/g, "$").replace(/@/g, '[remove]').replace(/YourTown,/, '').replace(/USofA/, '').replace(/you\(at\)company.com/, '');

const	fetchFeedback = async (uri) => {
	if (!db) { db = await new Db({
		host: process.env['DATABASE_HOST'],
		user: process.env['DATABASE_USER'],
		username: process.env['DATABASE_USERNAME'],
		password: process.env['DATABASE_PASSWORD'],
		database: process.env['DATABASE_DATABASE'],
	}).start(); }
	return (await db.query(`select * from feedback where uri = ? and isdeleted='F' order by dtcreated desc`, uri)).map(f => JSON.parse(cleanValue(JSON.stringify(f))));
}

const writeFeedback = async (body) => {
	if (!db) { db = await new Db({
		host: process.env['DATABASE_HOST'],
		user: process.env['DATABASE_USER'],
		username: process.env['DATABASE_USERNAME'],
		password: process.env['DATABASE_PASSWORD'],
		database: process.env['DATABASE_DATABASE'],
	}).start(); }
	return await db.query(`insert into feedback set dtcreated=now(), uri = ?, subject = ?, who = ?, whence = ?, comments = ?`,
		[ 'htdb/index.html',
		body.subject,
		body.who,
		body.whence,
		body.comments ]);
}

export { fetchFeedback, writeFeedback };
