const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'localhost', user: 'user', password: 'password', database: 'todo-db', connectionLimit: 5});

async function asyncFunction() {
  let conn;
  try {

	conn = await pool.getConnection();
	const rows = await conn.query("SELECT * FROM myTable");
	console.log(rows);

	const res = await conn.query("INSERT INTO myTable VALUES (?, ?)", ["steven", 47]);
	console.log(res);
	// res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } finally {
	if (conn) conn.release(); //release to pool
  }
}

asyncFunction();
