const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'Applesteam5!@#',
    port: 3306,
    database: 'EXPRESSALI'
});

function getMembers(callback) {
    var sql = `select * from members order by id desc`;
    connection.query(
        sql,
        (err, rows, fileds) => {
            if (err) throw err;
            callback(rows);
        }
    )
}

function getIds(callback) {
    var sql = `select id from members order by id desc`;
    connection.query(
        sql,
        (err, rows, fields) => {
            if (err) throw err;
            callback(rows);
        }
    )
}

function loginCheck(memberData, callback) {
    var sql = 
    `
    select * from members
    where id = '${memberData['id']}' and password = '${memberData['password']}';
    `
    connection.query(
        sql,
        (err, rows, fields) => {
            if (err) throw err;
            callback(rows);
        }
    )
}

function createMember(memberData) {
    var sql = 
    `
    insert into members(id, password)
    values ('${memberData['id']}','${memberData['password']}')
    `;
    connection.query(
        sql,
    )
}

module.exports = {
    getMembers,
    createMember,
    getIds,
    loginCheck,
}