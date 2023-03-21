const mysql = require('mysql');
const { helper: hlp } = require('../helper/helper');
require('dotenv').config();


// process.env();


const helper = new hlp();

const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.USER_ID,
    password: process.env.PASSWORD,
    connectionLimit: 10,
})

// console.log(pool);
// process.exit();

exports.raw_query = function (query, db = process.env.DATABASE) {
    // console.log(process.env.HOSTNAME);
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                reject(err);
            }

            //change database
            connection.changeUser({
                database: db
            }, function (err) {
                if (err) {
                    reject(err);
                }

                connection.query(query.toString(), function (error, results, fields) {
                    if (error) {
                        reject(error)
                    }

                    resolve(results)
                })

                connection.release();
            })


        })
    })
}





